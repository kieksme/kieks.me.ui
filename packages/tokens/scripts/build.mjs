import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
export function render(tokens) {
  const block = (selector, values) => `${selector} {\n${Object.entries(values).map(([name, value]) => `  --${name}: ${value};`).join('\n')}\n}`;
  return `/* Generated from tokens.json; do not edit. */\n${block(':root, [data-theme="light"]', { ...tokens.brand, ...tokens.light, ...tokens.typography })}\n\n${block('.dark, [data-theme="dark"]', tokens.dark)}\n`;
}
export async function build() {
  const tokens = JSON.parse(await readFile(new URL('../tokens.json', import.meta.url), 'utf8'));
  await mkdir(resolve(root, 'dist'), { recursive: true });
  await writeFile(resolve(root, 'dist/tokens.css'), render(tokens));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
