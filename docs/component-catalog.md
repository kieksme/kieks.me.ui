# Komponentenkatalog und Prüfungen

## Implementiert: Astrobook

`apps/catalog` ist die eigenständige Astrobook-Anwendung. Astro 5.18.2 und Astrobook 0.13.3 sind im Root-Lockfile gepinnt. Fünf native Bausteine aus `@kieksme/astro` nutzen `@kieksme/tokens` und unveränderte Website-Logos. Dreizehn Storyvarianten zeigen Hell/Dunkel, deaktivierte/sekundäre Buttons und Akzentüberschriften.

Astrobook stellt isolierte Beispiele bereit und unterstützt einen Teil von CSFv3. Ein vollständiger Storybook-Addon-/Controls-Umfang wird nicht behauptet. React-Bausteine sind hier noch nicht implementiert. Die vorhandenen Website-, Kurs- und Budgetanwendungen wurden nicht umgestellt.

## Automatisierte Prüfungen

`npm run build` baut Tokens und 27 statische Katalogseiten. `npm test` prüft vier Token-/Herkunftseigenschaften. `npm run test:browser` nutzt Playwright gegen einen eigenen temporären HTTP-Server: Home und Storynavigation, reale Hell/Dunkel-Farbwerte, Button-Fokus und Disabled-State, alle Komponenten einschließlich geladenem Logo sowie Screenshots bei 375/1200px ohne horizontalen Overflow. Screenshots sind Prüfartefakte, noch keine freigegebenen visuellen Regression-Baselines. Der Test prüft auch auftretende Browserfehler.

Vor dem Storyscan entfernt der Build alte eigene `dist/`-Dateien. So bleiben generierte `.stories.js`-Outputs vom nächsten Build getrennt; wiederholte Root- und Unterpfad-Builds wurden geprüft.

## Dokumentation und Bereitstellung

Ziel: **https://ui.kieks.me**, tatsächlichen Live-Status getrennt prüfen. Build-/Base-Path-Regeln stehen in `apps/catalog/README.md`; Standardausgabe ist `apps/catalog/dist`. Domain, DNS und HTTPS sind vom Katalogcode getrennt.

Interaktive Beispiele und Varianten gehören in den Katalog. Allgemeine Anleitungen und Beitragsregeln können im GitHub-Wiki gepflegt werden. Versionsabhängige technische Hinweise bleiben beim Code im Repository. Astro-7-/weitere Konsumententests bleiben ein eigener Migrationsschritt; der Katalog allein beweist keine Kompatibilität aller Anwendungen.
