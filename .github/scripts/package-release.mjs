import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const packageNames = ['tokens', 'astro'];
const publish = process.argv.includes('--publish');
const output = resolve(process.env.RELEASE_DIR || '.release');
await mkdir(output, { recursive: true });
const manifests = await Promise.all(packageNames.map(async (name) => JSON.parse(await readFile(`packages/${name}/package.json`, 'utf8'))));
const version = manifests[0].version;
if (manifests.some((p) => p.version !== version || p.private || p.publishConfig?.access !== 'public')) throw new Error('Both public packages must have the same explicit version and public publishConfig');
if (manifests[1].dependencies['@kieksme/kieksme-tokens'] !== version) throw new Error('Astro must depend on the exact released token version');
if (process.env.GITHUB_REF_TYPE === 'tag' && process.env.GITHUB_REF_NAME !== `ui-v${version}`) throw new Error('Release tag must match ui-v<package version>');
const root = JSON.parse(await readFile('package.json', 'utf8'));
const catalog = JSON.parse(await readFile('apps/catalog/package.json', 'utf8'));
if (!root.private || !catalog.private) throw new Error('Workspace root and catalog must remain private');
const run = (args) => execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
const packs = [];
for (const name of packageNames) {
  const [pack] = JSON.parse(run(['pack', `--workspace=${manifests[packageNames.indexOf(name)].name}`, '--json', '--pack-destination', output]));
  packs.push(pack);
  console.log(`${pack.name}@${pack.version}: ${pack.files.length} packed files`);
}
if (!publish) {
  console.log(`Prepared packages only in ${output}; no registry write requested.`);
} else {
  for (const pack of packs) {
    // Registry checks never use an ignore-errors fallback: only a confirmed E404 permits first publication.
    let existing;
    try {
      existing = JSON.parse(execFileSync('npm', ['view', `${pack.name}@${pack.version}`, 'dist.integrity', '--json', '--registry=https://registry.npmjs.org'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
    } catch (error) {
      let details;
      try { details = JSON.parse(String(error.stdout)); } catch {}
      if (details?.error?.code !== 'E404') throw new Error(`Could not safely determine published version status for ${pack.name}`);
    }
    if (existing) {
      if (existing !== pack.integrity) throw new Error(`${pack.name}@${pack.version} exists with different content; bump versions instead of skipping`);
      console.log(`Verified existing identical ${pack.name}@${pack.version}; skipping`);
      continue;
    }
    execFileSync('npm', ['publish', resolve(output, pack.filename), '--access=public', '--provenance', '--registry=https://registry.npmjs.org'], { stdio: 'inherit' });
  }
}
