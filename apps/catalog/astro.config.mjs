import { defineConfig } from 'astro/config';
import astrobook from 'astrobook';
export default defineConfig({ site: process.env.CATALOG_SITE || 'https://ui.kieks.me', base: process.env.CATALOG_BASE || '/', integrations: [astrobook({
 css: ['../../packages/tokens/dist/tokens.css', '../../packages/astro/src/styles.css'],
 homeContent: { title: 'kieks.me UI', subtitle: 'Gemeinsame Bausteine. Eine Marke.', version: { label: 'v0.1.0' }, repo: { href: 'https://github.com/kieksme/kieks.me.ui', label: 'Repository' } },
})] });
