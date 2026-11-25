# Live Controls im statischen Komponenten-Katalog

Die drei Einträge **Live Controls / Card**, **Button** und **Heading** zeigen interaktive, beschriftete Einstellfelder, eine Vorschau und ein mitlaufendes Astro-Codebeispiel. Die Oberfläche bleibt vollständig statisch und ist mit GitHub Pages kompatibel.

## Echte Komponenten und unterstützte Einstellungen

- Card nutzt `@kieksme/kieksme-astro/components/Card`: `variant` surface/muted/brand, `padding` none/s/m/l, `shadow` none/ink/aqua sowie Titel/Beschreibung. Leere Texte erzeugen keine erfundenen Inhalte.
- Button nutzt `@kieksme/kieksme-astro/components/Button`: primary/secondary/ghost, Größe s/m/l, Schatten ink/none, Beschriftung und disabled. Der optionale Pfeil wird als echtes Inline-SVG im Inhalts-Slot übergeben; es gibt keine erfundene Icon-Prop. Die Vorschauaktion zählt nur lokale Testklicks.
- Heading nutzt ausdrücklich die **Website-Heading** aus `@kieksme/kieksme-astro/website/Heading`, nicht die einfachere generische Heading. Einstellbar sind level 1/2/3, size s/l/xl/cta/cta-ki, Text und Fuchsia-/Aqua-/kein sichtbarer Schatten. Kein Schatten entspricht den tatsächlichen Props `shadowColor="transparent"` und `shadowSize="0 0 0"`.
- Alle drei Oberflächen unterstützen Hell/Dunkel und Zurücksetzen.

## Statisches Rendering und sichere Texte

Astro rendert beim Build die begrenzten, typisierten Kombinationen der echten Komponenten in inaktive HTML-Templates: 36 Card-, 72 Button- und 45 Website-Heading-Varianten. Der Client wählt ausschließlich aus diesen bestehenden Templates, klont deren DOM und aktualisiert Texte mit `textContent`. Benutzereingaben werden weder als HTML ausgewertet noch als CSS, URL oder Programmcode ausgeführt. Das Codebeispiel ist ebenfalls nur Text. Es ist kein clientseitiger Astro-Renderer und keine allgemeine Laufzeit-Auswertung beliebiger Props.

Die Controls verwenden native Formularelemente. Jede Playground-Instanz hat eigene Templates, Formularzustände und Vorschau. Initialisierung ist mit Astro-Clientnavigation kompatibel. Ohne JavaScript werden Live Controls nicht aktiv; die übrigen statischen Stories bleiben verfügbar.

## Prüfung

Nach dem Katalog-Build:

```sh
node apps/catalog/test/playground.mjs
```

Die Playwright-Prüfung unterstützt `CATALOG_BASE`, damit Root und der GitHub-Pages-Unterpfad geprüft werden können. Sie testet Variantenklassen und tatsächliche Geometrie/Farben, Beschriftungen, Codebeispiele, disabled-Verhalten, SVG-Slot, Textinjektion, Heading-Ebenen/Größen/Schatten, Hell/Dunkel, Reset, mehrere unabhängige Instanzen, Tastaturfokus und mobile Überläufe. Keine Paketquellen oder npm-Release-Tarballs werden dafür verändert.
