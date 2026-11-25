# kieks.me UI – Astrobook-Katalog

Statischer Komponentenkatalog mit Astro 5.18.2 und Astrobook 0.13.3, nativen Astro-Bausteinen und lokal ausgelieferten Hanken-Grotesk-/Source-Sans-3-Fonts. Astrobook unterstützt einen Teil des CSFv3-Formats; es ist kein vollständiger Storybook-Ersatz.

## Lokal

Vom Repositoryroot mit Node 24:

```sh
npm ci --ignore-scripts
npm run dev
npm run build
npm test
npm run test:browser
```

Im eingeschränkten Cloud-Workspace bei Bedarf einen beschreibbaren `npm_config_cache`, `XDG_CONFIG_HOME` und `XDG_CACHE_HOME` setzen und `ASTRO_TELEMETRY_DISABLED=1` exportieren. Der Browser-Smoke verwendet vorhandenes `/usr/bin/chromium` oder `CHROMIUM_PATH`; andernorts vorher `npx playwright install chromium` ausführen. Tests starten und stoppen ihren eigenen lokalen HTTP-Server.

Dreizehn Varianten zeigen Logo, Heading, Button, Card und Note jeweils hell/dunkel sowie Akzent, sekundären und deaktivierten Zustand. Der Katalog lädt nur lokale Assets und Fonts. CI prüft Tokenkonsistenz, statischen Build, Navigation, Themes, Fokus, deaktivierte Buttons und Mobilansichten. Screenshot-Dateien sind lokale Prüfartefakte, noch kein pixelgenauer Regressionstest mit freigegebenen Baselines.

## Hosting

Build: `npm ci --ignore-scripts && npm run build` im Repositoryroot. Statische Ausgabe **`apps/catalog/dist`**. Kein SSR-Server oder Secret nötig. Für Netlify/Coolify dasselbe Buildkommando und Ausgabeverzeichnis verwenden. Direkte Story-URLs müssen als statische Verzeichnisindizes ausgeliefert werden; keine pauschale SPA-Umschreibung erforderlich.

Die Zieladresse ist `https://ui.kieks.me`. Die tatsächliche Domain-/TLS-/Hosting-Einrichtung übernimmt der Hauptauftrag. Eine Projektseite bei GitHub Pages kann zunächst einen Unterpfad benötigen:

```sh
CATALOG_SITE=https://kieksme.github.io CATALOG_BASE=/kieks.me.ui npm run build
CATALOG_BASE=/kieks.me.ui npm run test:browser
```

Mit Custom Domain wird `CATALOG_SITE=https://ui.kieks.me` und `CATALOG_BASE=/` verwendet (Standardeinstellungen). Kein CNAME ist fest eingebaut. GitHub Pages für ein privates Repository setzt einen geeigneten GitHub-Plan voraus; die öffentliche Katalogausgabe enthält ausschließlich Komponentenbeispiele, keine Kurs- oder Kundendaten.
