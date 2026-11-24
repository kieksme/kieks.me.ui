# kieks.me.ui – Startstruktur

Lokaler Vorschlag für ein eigenes kieks.me-Designsystem-Repository. Noch kein GitHub-Repository, keine Veröffentlichung und keine Migration bestehender Anwendungen. Der Repositoryname `kieks.me.ui` ist bestätigt; die Paketnamen sind Vorschläge.

## Was bereits funktioniert

`@kieksme/tokens` enthält die vorhandenen Website-Farben und CSS-Variablennamen einschließlich Hell/Dunkel, kompatibler Aliase sowie die Marken-Schriftfamilien. Ein Node-Build ohne Fremdabhängigkeiten erzeugt CSS; Herkunft und Konsistenz werden geprüft. Die unveränderten Referenzen liegen beim Paket. Ein vollständiger Komponentenbestand ist noch nicht extrahiert.

Mit Node 24 im Repositoryroot:

```sh
npm run build
npm test
```

Eine Paketinstallation ist hierfür nicht erforderlich. Das Beispiel `examples/tokens.html` nach dem Build im Browser öffnen. Es benötigt weder Server noch Netzwerk und erlaubt Hell/Dunkel-Auswahl.

## Struktur

- `packages/tokens`: implementierte frameworkneutrale Basis, Version 0.1.0, zunächst privat.
- `packages/astro`: dokumentierter nächster Extraktionsschritt, noch kein Paket.
- `templates/email`: Anschlussplan für MJML; die derzeitige Implementierung bleibt im DataHub.
- `templates/print`: Anschlussplan für PDF und PowerPoint; kein universeller Web-Renderer.
- `docs`: Architektur, Herkunft, Migrationsplan und Releaseentscheidungen.
- `examples`: lokale Darstellung des Tokenpakets.
- Ein zukünftiger Astrobook-Komponentenkatalog mit Playwright-Prüfungen ist in `docs/component-catalog.md` geplant, noch nicht installiert. Zieladresse: `https://ui.kieks.me`; Hosting, DNS und TLS sind noch nicht eingerichtet.

Ein React-Paket wird erst angelegt, wenn tatsächlich eigene React-Komponenten für DataHub benötigt werden. Payloads Adminoberfläche wird nicht pauschal ersetzt.

## Gemeinsame Basis, passende Renderer

Markenfarben wie Navy/Aqua bleiben stabil; semantische Werte wie Text, Hintergrund, Hinweisfläche und Link ändern sich mit dem Modus. `pop-gray` ist historisch modusabhängig und deshalb kein unveränderlicher Markenwert. Die vorhandenen Variablennamen bleiben im ersten Schritt erhalten, um unbemerkte Designänderungen zu vermeiden. Der Ursprung verwendet explizites `.dark`; das Paket ergänzt `[data-theme]`, ändert aber nicht automatisch nach Betriebssystempräferenz den Modus.

Schriftfamilien: Hanken Grotesk für Überschriften, Source Sans 3 für Fließtext. Fontdateien werden nicht automatisch geladen oder eingebettet. Originale Logos, Illustrationen und Schriftlizenzen bleiben zunächst im Brand-Repository; vor einem Paketexport müssen Asset-Auswahl, Versionierung und Lizenzen geklärt werden. Logos werden nicht verändert.

Astro, React, MJML und Print teilen Designwerte und Assets, benötigen jedoch eigene Komponenten bzw. Vorlagen. MJML-Clients können CSS-Variablen und Webfonts nicht verlässlich verwenden: Der Mail-Build setzt Werte direkt ein und bietet Systemfont-Fallbacks. Für druckbare PDFs ist ein sparsames helles Drucklayout sinnvoll, kein ungefragter Dark-Mode-Ausdruck. PowerPoint braucht echte Folienmaster und eingebettete bzw. kompatible Schriftregeln.

## Etappen und Entscheidungen

Siehe `docs/migration.md` und `docs/releases.md`. Keine Produktivänderung oder Veröffentlichung erfolgt durch diese Startstruktur.
