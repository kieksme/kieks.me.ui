# Komponentenkatalog und Prüfungen

## Beschlossener Ansatz: Astrobook und Playwright

Für die Astro-Bausteine bietet sich **Astrobook** als Galerie an. Nach derzeitiger Prüfung durch den Hauptagenten unterstützt Version 0.13.3 Astro ab Version 5 sowie eingebettete React-/Vue-Komponenten. Es übernimmt einen Teil des CSFv3-Formats, unter anderem Args und Decorators, aber nicht automatisch das vollständige Storybook-Ökosystem.

Upstream: https://github.com/ocavue/astrobook

Astrobook und Playwright sind als Ansatz bestätigt. Geplant ist eine eigenständige Anwendung unter `apps/playground`. Sie konsumiert die lokalen Workspace-Pakete, bietet je Komponente eine Seite mit Varianten, Zuständen und Props und nutzt dieselben Tokens. Die aktuelle Token-Vorschau unter `examples/tokens.html` ersetzt diesen Katalog nicht.

## Vorschau ist nicht automatisierte Prüfung

Astrobook zeigt Komponenten isoliert an. Automatisierte Browserprüfungen werden getrennt aufgebaut, etwa mit Playwright: funktionierende Interaktionen, Fokusreihenfolge, Tastaturbedienung und gezielte visuelle Vergleiche bei Hell/Dunkel sowie schmalen/breiten Ansichten. Für jede Komponente braucht es sinnvolle Zustände wie Standard, Hover/Fokus, deaktiviert und Fehlerzustand, sofern zutreffend.

Zieladresse ist **https://ui.kieks.me**. Das ist ein Planungsziel, keine derzeit geprüfte Live-Seite. Hosting, DNS-Eintrag und TLS sind noch nicht eingerichtet; ein Deployment wurde nicht durchgeführt.

Die Galerie wird im nächsten Umsetzungsschritt mit gewählter Version, eingefrorenem Lockfile und passenden Astro-5/7-Konsumententests installiert. In dieser Startstruktur wurden weder Astrobook noch Playwright installiert oder als bereits funktionierend behauptet.
