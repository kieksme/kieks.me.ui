# kieks.me.ui – Designsystem

Gemeinsames kieks.me-Designsystem mit Designwerten und einem Astrobook-Komponentenkatalog. Version 0.2.0 enthält 22 allgemeine und 17 Website-kompatible Astro-Bausteine. Website und Kursportal werden mit gepackten, versionierten Paketen angebunden; die öffentlichen npm-Pakete sind noch nicht veröffentlicht.

## Was bereits funktioniert

`@kieksme/kieksme-tokens` enthält die vorhandenen Website-Farben und CSS-Variablennamen einschließlich Hell/Dunkel, kompatibler Aliase sowie die Marken-Schriftfamilien. Ein Node-Build ohne Fremdabhängigkeiten erzeugt CSS; Herkunft und Konsistenz werden geprüft. Die unveränderten Referenzen liegen beim Paket. Ein vollständiger Komponentenbestand ist noch nicht extrahiert.

Mit Node 24 im Repositoryroot:

```sh
npm ci --ignore-scripts
npm run dev
npm run build
npm test
npm run test:browser
```

Die Browserprüfung benötigt Chromium (vorhandenes System-Chromium oder `npx playwright install chromium`). Das Beispiel `examples/tokens.html` nach dem Build im Browser öffnen. Es benötigt weder Server noch Netzwerk und erlaubt Hell/Dunkel-Auswahl.

## Struktur

- `packages/tokens`: implementierte frameworkneutrale Basis, Version 0.2.0, für öffentliche npm-Verteilung vorbereitet.
- `packages/astro`: allgemeine Form-/Interaktionsbausteine und Website-Komponenten mit eigenständigem CSS, typisierten Varianten und nativen Attributen.
- `templates/email`: Anschlussplan für MJML; die derzeitige Implementierung bleibt im DataHub.
- `templates/print`: Anschlussplan für PDF und PowerPoint; kein universeller Web-Renderer.
- `docs`: Architektur, Herkunft, Migrationsplan und Releaseentscheidungen.
- `examples`: lokale Darstellung des Tokenpakets.
- `apps/catalog`: implementierter Astrobook-Katalog mit Website-Galerie, einzelnen Primitives und Varianten-/Interaktionstests, siehe `docs/component-catalog.md` und `apps/catalog/README.md`. Live unter `https://kieksme.github.io/kieks.me.ui/`; Zieladresse `https://ui.kieks.me` benötigt weiterhin die Domain-/DNS-Zuordnung.

Ein React-Paket wird erst angelegt, wenn tatsächlich eigene React-Komponenten für DataHub benötigt werden. Payloads Adminoberfläche wird nicht pauschal ersetzt.

## Gemeinsame Basis, passende Renderer

Markenfarben wie Navy/Aqua bleiben stabil; semantische Werte wie Text, Hintergrund, Hinweisfläche und Link ändern sich mit dem Modus. `pop-gray` ist historisch modusabhängig und deshalb kein unveränderlicher Markenwert. Die vorhandenen Variablennamen bleiben im ersten Schritt erhalten, um unbemerkte Designänderungen zu vermeiden. Der Ursprung verwendet explizites `.dark`; das Paket ergänzt `[data-theme]`, ändert aber nicht automatisch nach Betriebssystempräferenz den Modus.

Schriftfamilien: Hanken Grotesk für Überschriften, Source Sans 3 für Fließtext. Der Katalog lädt lokale Fontsource-Dateien; andere Konsumenten kontrollieren ihre Font-Einbindung selbst. Zwei Original-Logo-SVGs sind unverändert aus der Website im Astro-Paket enthalten. Weitere Illustrationen/Assets bleiben im Brand-Repository; die Fontlizenzen liegen auch im statischen Katalog unter `licenses/`.

Astro, React, MJML und Print teilen Designwerte und Assets, benötigen jedoch eigene Komponenten bzw. Vorlagen. MJML-Clients können CSS-Variablen und Webfonts nicht verlässlich verwenden: Der Mail-Build setzt Werte direkt ein und bietet Systemfont-Fallbacks. Für druckbare PDFs ist ein sparsames helles Drucklayout sinnvoll, kein ungefragter Dark-Mode-Ausdruck. PowerPoint braucht echte Folienmaster und eingebettete bzw. kompatible Schriftregeln.

## Etappen und Entscheidungen

Siehe `docs/migration.md` und `docs/releases.md`. Keine Produktivänderung oder Veröffentlichung erfolgt durch diese Startstruktur.

## Dokumentation und Bereitstellung

Der interaktive Katalog ist für `https://ui.kieks.me` vorgesehen. Allgemeine Anleitungen und Beiträge gehören ins GitHub-Wiki; versionsabhängige technische Dokumentation bleibt mit dem Code unter `docs/`. Das Wiki wird durch den Build nicht automatisch veröffentlicht.

GitHub Pages verwendet `.github/workflows/pages.yml`. Der Workflow liest Origin und Basispfad aus der Pages-Konfiguration, baut den Katalog und veröffentlicht `apps/catalog/dist`. Solange keine Custom Domain eingerichtet ist, gilt der GitHub-Projektpfad `/kieks.me.ui`. Für die Custom Domain sind in Pages `ui.kieks.me` und bei IONOS ein CNAME `ui` auf `kieksme.github.io` einzurichten; anschließend DNS und HTTPS prüfen. Vorhandene Website- und Mail-Records bleiben erhalten.
