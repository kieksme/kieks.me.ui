# Migration in Etappen

1. **Website als Referenz sichern:** Logo, Heading, Lead, Button, FaqItem und wenige Karten unter `kieks.me/src/components/ui` inventarisieren; API, Zustände, Abhängigkeiten und visuelle Referenzen festhalten. Figma-Tokens gegen CSS prüfen. Die übrigen Website-Widgets nicht blind kopieren.
2. **Basis versionieren:** Token-/Asset-Verantwortung zwischen UI- und Brand-Repository festlegen. Reproduzierbaren Build und Paketprüfung in CI einrichten; erste private Release nur nach Entscheidung über Registry/Zugriff.
3. **Astro extrahieren und Website vergleichen:** Astrobook als Katalog mit Playwright-Prüfungen unter der geplanten Adresse `https://ui.kieks.me` aufbauen; Hosting/DNS/TLS getrennt einrichten und danach prüfen.  Eine kleine Astro-Bibliothek mit expliziten Props, semantischem HTML und gekapselten Styles erstellen; Webfonts und vorhandene Theme-Steuerung vom Konsumenten kontrollieren lassen. Website bleibt visuelle Referenz und Vergleichsziel.
4. **Kurs als Pilot integrieren:** Eine fixierte Version verwenden, zunächst Logo, Typografie, Farben und Grundbausteine. Das bisherige grüne Kurs-Theme wird bewusst gegen kieks.me-Pop abgeglichen. Lerninhalte, Zugangsschutz und Kurslogik unabhängig lassen. Die Website-Nutzung selbst wird nach Pilotvalidierung umgestellt.
5. **Budget, dann DataHub:** Budget verwendet separate AstroWind-Komponenten; schrittweise ersetzen und bestehende Backendfehler getrennt behandeln. DataHub/Payload nur an unterstützten Erweiterungspunkten anpassen; React-Paket nur bei belegtem Bedarf.
6. **E-Mail und Kursunterlagen:** Die neuen DataHub-MJML-Vorlagen nach Stabilisierung übernehmen, ohne laufende Arbeit zu duplizieren. PDF-Materiallayout, Teilnahmebestätigung und PPTX-Folienmaster mit derselben Basis entwickeln. Datenrechte und Versandregeln gehören weiter in DataHub, nicht ins Designsystem.

## Technische Grenzen

Website/Budget verwenden Tailwind 3, Brand/Kurs Tailwind 4. Keine globale Tailwind-Preset-Abhängigkeit als gemeinsamer Nenner erzwingen; zunächst normales CSS liefern. Die Website verwendet Astro 5, die Kursplattform Astro 7: Peer-Versionen und Buildmatrix eines zukünftigen Astro-Pakets müssen beide Zielversionen tatsächlich validieren. Ein Paketexport allein belegt keine Kompatibilität.

## Gates pro Etappe

- Konsumenten mit eingefrorenem Lockfile installieren und vorhandene Builds/Tests ausführen.
- Visuell Hell/Dunkel, schmale/breite Ansichten, Fokus und wesentliche Zustände prüfen.
- Keine automatischen Major-Upgrades; Rollback durch die vorherige fixierte Paketversion.
- Mail: MJML-Validierung plus repräsentative Mailclient-Prüfungen; Print: Umbrüche, Logo, eingebettete Schriften und Lesbarkeit prüfen.
- Produktive Kursdaten sind noch nicht vollständig abgeglichen. Die vorbereitete Entfernung von Markdown-Importquelle und Importer bleibt davon getrennt blockiert; dieses Repository entfernt sie nicht.
