# Komponentenkatalog und Prüfungen

## Implementiert: Astrobook

`apps/catalog` ist die eigenständige Astrobook-Anwendung. Astro 5.18.2 und Astrobook 0.13.3 sind im Root-Lockfile gepinnt. Version 0.2.0 enthält 22 allgemeine und 17 Website-kompatible Bausteine aus `@kieksme/kieksme-astro`. Gemeinsame Designwerte kommen aus `@kieksme/kieksme-tokens`; Originalassets bleiben unverändert. Stories zeigen Hell/Dunkel, Karten-/Buttonvarianten sowie Formular-, Fehler-, deaktivierte und ausgeblendete Zustände. Die Website-Galerie zeigt die vorhandenen Markenbausteine separat.

Astrobook stellt isolierte Beispiele bereit und unterstützt einen Teil von CSFv3. Ein vollständiger Storybook-Addon-/Controls-Umfang wird nicht behauptet. React-Bausteine sind hier noch nicht implementiert. Die Verbraucheränderungen für Website und Kursportal werden gesondert mit genau denselben gepackten Paketen geprüft; das Budgetportal ist noch nicht migriert.

## Automatisierte Prüfungen

`npm run build` baut Tokens und alle statischen Storyseiten. `npm test` prüft vier Token-/Herkunftseigenschaften. `npm run test:browser` nutzt Playwright gegen eigene temporäre HTTP-Server: Home und Storynavigation, reale Hell/Dunkel-Farbwerte, Button-Fokus und Disabled-State, Website-Galerie und geladene Assets sowie Screenshots bei 375/1200px ohne horizontalen Overflow. Die ergänzende Primitive-Suite prüft Formularbeziehungen, native Controls, Radio-Tastaturbedienung, Progress, Dialoge samt Fokus, Clipboard-Fehler, synchronisierte Theme-Umschalter, Hidden-Verhalten und Card-/Buttonvarianten. Screenshots sind Prüfartefakte, noch keine freigegebenen visuellen Regression-Baselines. Tests prüfen auch Browserfehler.

Vor dem Storyscan entfernt der Build alte eigene `dist/`-Dateien. So bleiben generierte `.stories.js`-Outputs vom nächsten Build getrennt; wiederholte Root- und Unterpfad-Builds wurden geprüft.

## Dokumentation und Bereitstellung

Ziel: **https://ui.kieks.me**, tatsächlichen Live-Status getrennt prüfen. Build-/Base-Path-Regeln stehen in `apps/catalog/README.md`; Standardausgabe ist `apps/catalog/dist`. Domain, DNS und HTTPS sind vom Katalogcode getrennt.

Interaktive Beispiele und Varianten gehören in den Katalog. Allgemeine Anleitungen und Beitragsregeln können im GitHub-Wiki gepflegt werden. Versionsabhängige technische Hinweise bleiben beim Code im Repository. Die tatsächlichen Paketdateien werden zusätzlich in getrennten Astro-5.18.2-/7.4.13-Anwendungen gebaut. Diese Prüfung und die Produkttests ersetzen keine Zusage für jede Version innerhalb der Peer-Range.
