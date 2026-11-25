import { mkdtemp, readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const releaseDir = resolve(process.env.RELEASE_DIR || '.release');
const packages = await readdir(releaseDir);
const tar = (prefix) => resolve(releaseDir, packages.find((file) => file.startsWith(prefix) && file.endsWith('.tgz')) || 'MISSING');
for (const version of ['5.18.2', '7.4.13']) {
  const cwd = await mkdtemp(join(tmpdir(), 'kieksme-consumer-'));
  await mkdir(join(cwd, 'src/pages'), { recursive: true });
  await writeFile(join(cwd, 'package.json'), JSON.stringify({ name: 'isolated-ui-consumer', private: true, type: 'module', scripts: { build: 'astro build' }, dependencies: { astro: version, '@kieksme/tokens': `file:${tar('kieksme-tokens-')}`, '@kieksme/astro': `file:${tar('kieksme-astro-')}` } }));
  await writeFile(join(cwd, 'src/pages/index.astro'), `---\nimport '@kieksme/tokens/css';\nimport '@kieksme/astro/styles.css';\nimport '@kieksme/astro/fonts.css';\nimport Logo from '@kieksme/astro/components/Logo';\nimport Heading from '@kieksme/astro/components/Heading';\nimport Card from '@kieksme/astro/components/Card';\n---\n<html lang="de" data-theme="dark"><head><meta charset="utf-8"/><title>Consumer smoke</title></head><body><Logo/><Heading text="Paketprüfung"/><Card title="Isolierter Verbraucher"/></body></html>`);
  const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', XDG_CACHE_HOME: process.env.XDG_CACHE_HOME || join(cwd, '.cache'), XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME || join(cwd, '.config') };
  execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], { cwd, env, stdio: 'inherit' });
  execFileSync('npm', ['run', 'build'], { cwd, env, stdio: 'inherit' });
  const html = await readFile(join(cwd, 'dist/index.html'), 'utf8');
  if (!html.includes('Paketprüfung') || !html.includes('Isolierter Verbraucher') || !html.includes('alt="kieks.me"')) throw new Error(`Missing rendered component or bundled asset in Astro ${version}`);
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  if (images.length !== 2) throw new Error(`Missing light/dark logo pair in Astro ${version}`);
  for (const src of images) {
    if (src.startsWith('data:image/svg+xml,')) {
      if (!decodeURIComponent(src.split(',').slice(1).join(',')).includes('<svg')) throw new Error('Invalid inline logo SVG');
    } else if (src.startsWith('/_astro/')) {
      if (!(await readFile(join(cwd, 'dist', src.slice(1)), 'utf8')).includes('<svg')) throw new Error('Invalid bundled logo SVG');
    } else throw new Error(`Unexpected logo asset source in Astro ${version}`);
  }
  const cssParts = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  for (const href of [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map((m) => m[1])) cssParts.push(await readFile(join(cwd, 'dist', href.replace(/^\//, '')), 'utf8'));
  const css = cssParts.join('\n');
  if (!css.includes('--pop-aqua') || !css.includes('ui-heading')) throw new Error(`Missing package CSS in Astro ${version}`);
  const builtAssets = await readdir(join(cwd, 'dist/_astro'));
  if (!builtAssets.some((name) => name.includes('hanken-grotesk') && name.endsWith('.woff2')) || !builtAssets.some((name) => name.includes('source-sans-3') && name.endsWith('.woff2'))) throw new Error(`Missing self-hosted fonts in Astro ${version}`);
  console.log(`Verified actual tarball consumer: Astro ${version}`);
}
