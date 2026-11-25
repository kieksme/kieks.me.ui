import { rm } from 'node:fs/promises';
// Astrobook scans story files recursively; remove compiled *.stories.js before discovery.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
