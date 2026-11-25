import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const output = fileURLToPath(new URL('../playwright-results/', import.meta.url));
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
const prefix = (process.env.CATALOG_BASE || '/').replace(/\/$/, '');
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (prefix && !pathname.startsWith(prefix + '/')) throw new Error('outside base');
    let path = resolve(root, '.' + pathname.slice(prefix.length));
    if (path !== root.slice(0, -1) && !path.startsWith(root)) throw new Error('outside root');
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    response.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    response.end(await readFile(path));
  } catch { response.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}${prefix}`;
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
let browser;
try {
  browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1200, height: 850 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  assert.equal((await page.goto(base + '/')).status(), 200);
  await page.getByRole('heading', { name: 'kieks.me UI', exact: true }).waitFor();
  const storyLink = page.locator(`a[href="${prefix}/dashboard/src/stories/button/hell"]`).first();
  await storyLink.click();
  await page.waitForURL('**/dashboard/src/stories/button/hell');
  console.log('PASS catalog home and story navigation');
  const story = (kind, variant) => `${base}/stories/src/stories/${kind}/${variant}/`;
  for (const theme of ['hell', 'dunkel']) {
    assert.equal((await page.goto(story('button', theme))).status(), 200);
    const button = page.getByRole('button', { name: 'Weiter zum Kurs', exact: true });
    await button.waitFor();
    await page.keyboard.press('Tab');
    await button.focus();
    assert.equal(await button.evaluate(el => el === document.activeElement), true);
    assert.notEqual(await button.evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    await page.keyboard.press('Space');
    const frame = page.locator('.example');
    assert.equal(await frame.getAttribute('data-theme'), theme === 'hell' ? 'light' : 'dark');
    const background = await frame.evaluate(el => getComputedStyle(el).backgroundColor);
    assert.equal(background, theme === 'hell' ? 'rgb(244, 245, 249)' : 'rgb(18, 21, 28)');
    console.log(`PASS ${theme} tokens and keyboard focus`);
  }
  await page.goto(story('button', 'deaktiviert'));
  assert.equal(await page.getByRole('button', { name: 'Noch nicht verfügbar' }).isDisabled(), true);
  console.log('PASS disabled button state');
  for (const kind of ['logo', 'heading', 'card', 'note']) {
    for (const theme of ['hell', 'dunkel']) {
      await page.goto(story(kind, theme));
      assert.equal(await page.locator('.example').count(), 1);
      assert.ok((await page.locator('.stage').innerText()).trim() || kind === 'logo');
      if (kind === 'logo') assert.equal(await page.locator('.ui-logo img:visible').evaluate(el => el.complete && el.naturalWidth > 0), true);
    }
  }
  console.log('PASS logo, heading, card and note in both themes');
  await mkdir(output, { recursive: true });
  for (const [theme, width] of [['hell', 1200], ['dunkel', 1200], ['hell', 375], ['dunkel', 375]]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(story('card', theme));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.screenshot({ path: resolve(output, `${theme}-${width}.png`), fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log('PASS desktop/mobile screenshots, no horizontal overflow or page errors');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
