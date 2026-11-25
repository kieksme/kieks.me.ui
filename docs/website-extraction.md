# Website-Komponenten als wiederverwendbares Paket

Die Website bleibt die gestalterische Referenz. Die folgenden bestehenden Bausteine sind mit ihren bisherigen Props und Varianten in `packages/astro/src/website/` übernommen:

- Atome: Heading, Button, Lead, Logo, Marker, Note, Sticker, TextLink, ZigzagDivider, Burst, Flames und Halftone.
- Zusammengesetzte Komponenten: FaqItem, StepCard, FeatureCard, ServiceCard und SpeechBubble.

Importmuster: `@kieksme/kieksme-astro/website/Heading`. Diese Website-Bausteine unterscheiden sich von den bewusst einfacheren generischen Komponenten unter `components/`.

## Erhaltene Verträge

Größen, Farben, Schatten, Rotationen, Slots, Linkziele und dekorative Varianten entsprechen der jeweiligen Website-Quelle. Die alten Importpfade der Website bleiben als dünne Kompatibilitätseinstiege bestehen und delegieren die Darstellung an das Paket. Fachtexte und Routing liegen weiterhin bei der Website.

Button und TextLink reichen zusätzlich native HTML-Attribute wie `id`, `hidden`, `disabled`, `aria-*` und `data-*` weiter, soweit sie zum Element passen. Ein Button kann über den benannten Slot `icon` ein Icon erhalten. Die Website rendert ihre bisherigen `astro-icon`-Icons in diesem Slot; das Paket setzt deshalb keine Icon-Integration voraus. Logo erlaubt optional `lightSrc` und `darkSrc`; die Website behält damit ihre bisherigen Asset-URLs, während andere Verbraucher die mitgelieferten Original-SVGs nutzen können.

Note ist weiterhin eine Preview-Markierung und wird gemäß bestehender DEV-/`PUBLIC_SHOW_NOTES`-Regel ausgeblendet. Das ist kein öffentliches Status-/Fehlermeldungs-Element; dafür gibt es allgemeine Primitives.

## CSS und Assets

Die ursprünglichen Utility-Regeln sind einmalig mit der Website-Konfiguration vorcompiliert und zusammen mit dem bisherigen Interaktions-CSS in den Astro-Komponenten enthalten. Ein Verbraucher braucht weder Tailwind 3 noch einen Scan von `node_modules`. Die vorcompilierten Regeln liegen in niedrigpriorisierten CSS-Layern; so behalten externe Website-Utilities wie responsive Sichtbarkeit oder Abstandsklassen ihre bisherigen Effekte. Die Dateien enthalten keine globalen Utility-Stylesheets.

Die Website scannt die ausgelagerten Website-Dateien gezielt in ihrer bestehenden Tailwind-Konfiguration, damit ihre bisherige globale Preflight-/Utility-Kaskade unverändert bleibt. Das ist ein Kompatibilitätsschritt dieser bestehenden Anwendung, keine Buildvoraussetzung für andere Verbraucher. Interne `data-astro-cid-*`-Attribute werden bei Button/TextLink wie bisher nicht als native Nutzerattribute weitergereicht, damit vormals inaktive übergeordnete Scope-Selektoren nicht versehentlich Layoutregeln aktivieren.

Original-SVGs wurden unverändert nach `src/website/assets/` kopiert; die Zuordnung ist dort in `SOURCES.md` dokumentiert. Gemeinsame Tokens und Markenfonts müssen vom konsumierenden Layout geladen werden. Logo unterstützt sowohl `.dark` als auch `[data-theme="dark"]`; die Website behält ihre vorhandene Theme-Steuerung.

## Noch nicht extrahiert

Website-spezifische Seitenlayouts, Header-Routing, Sprachumschaltung, CMS-Ladewege und Fachinhalte bleiben in der Anwendung. Sie können die Paketbausteine bereits über die Kompatibilitätseinstiege verwenden. Eine spätere Extraktion weiterer Organismen braucht denselben Darstellungsabgleich und darf keine Varianten verlieren.

## Prüfverfahren

Die Website erhält portable, versionierte npm-Tarballs im eigenen `vendor/`-Verzeichnis, solange die öffentliche Registry-Veröffentlichung noch nicht eingerichtet ist. So benötigen Build und Preview keinen benachbarten UI-Checkout. Ein finales Release ersetzt beide Tarballs, aktualisiert das pnpm-Lockfile und wird anschließend mit eingefrorenem Lockfile geprüft.

Die Abnahme umfasst die vorhandenen 97 Website-Tests, Astro-Typprüfung, Produktionsbuild mit Markerprüfung sowie einen tatsächlichen Vorher-/Nachher-Vergleich gegen den unveränderten Website-Stand. Dabei werden Startseite und KI/MCP-Seite bei Desktop-/Mobilbreite in Hell/Dunkel verglichen. Eine bloße erfolgreiche Paketinstallation bestätigt keine unveränderte Darstellung.
