import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { render, build } from '../scripts/build.mjs';
const tokens = JSON.parse(await readFile(new URL('../tokens.json', import.meta.url), 'utf8'));
const css = await readFile(new URL('../sources/website-colors.css', import.meta.url), 'utf8');
const figma = JSON.parse(await readFile(new URL('../sources/figma-tokens.json', import.meta.url), 'utf8'));
const values = (selector) => Object.fromEntries([...css.match(new RegExp(selector + '\\s*\\{([\\s\\S]*?)\\}'))[1].matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]));
test('preserves every website variable and dark override', () => {
  assert.deepEqual({ ...tokens.brand, ...tokens.light }, values(':root'));
  assert.deepEqual(tokens.dark, values('\\.dark'));
});
test('Figma color semantics agree with website themes', () => {
  for (const theme of ['light', 'dark']) {
    const resolved = { ...tokens.brand, ...tokens.light, ...(theme === 'dark' ? tokens.dark : {}) };
    for (const [key, value] of Object.entries(figma[theme])) {
      if (!value.startsWith('#')) continue;
      assert.equal(resolved[key.replaceAll('/', '-')], value, `${theme}: ${key}`);
    }
  }
});
test('CSS aliases resolve in each mode; font families remain explicit', () => {
  for (const theme of ['light','dark']) {
    const resolved = { ...tokens.brand, ...tokens.light, ...(theme === 'dark' ? tokens.dark : {}) };
    for (const value of Object.values(resolved)) for (const match of value.matchAll(/var\(--([\w-]+)\)/g)) assert.ok(match[1] in resolved, match[1]);
  }
  assert.match(tokens.typography['font-heading'], /Hanken Grotesk/);
  assert.match(tokens.typography['font-body'], /Source Sans 3/);
});
test('build is reproducible and exports both explicit theme selectors', async () => {
  await build();
  const first = await readFile(new URL('../dist/tokens.css', import.meta.url), 'utf8');
  await build();
  assert.equal(await readFile(new URL('../dist/tokens.css', import.meta.url), 'utf8'), first);
  assert.equal(first, render(tokens));
  assert.ok(first.includes('[data-theme="light"]'));
  assert.ok(first.includes('[data-theme="dark"]'));
});
