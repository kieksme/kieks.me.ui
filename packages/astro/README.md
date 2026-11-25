# @kieksme/astro

Initial Astro source-component package for kieks.me: Logo, Heading, Button, Card and Note. Components are exported as `.astro` sources so the consuming Astro build handles their compilation and bundled SVG assets.

```astro
---
import '@kieksme/tokens/css';
import '@kieksme/astro/styles.css';
import '@kieksme/astro/fonts.css'; // optional self-hosted fonts
import Heading from '@kieksme/astro/components/Heading';
import Card from '@kieksme/astro/components/Card';
---
<Heading>Gemeinsam weiterdenken.</Heading>
<Card title="Ein gemeinsamer Anfang"><p>Inhalte bleiben im jeweiligen Produkt.</p></Card>
```

`@kieksme/tokens` is an exact-version dependency. Consumers supply Astro through the peer dependency. No Tailwind installation is required by these components. Fonts are consumer-controlled: optionally import `@kieksme/astro/fonts.css` to self-host Hanken Grotesk and Source Sans 3 through pinned `@fontsource` dependencies, or supply your own licensed font loading. Preserve the upstream OFL notices. Logo SVGs are included unchanged; see LICENSES.md and the original GPL text for their distinct provenance.

The declared Astro peer range is a compatibility target, not evidence that every version has been tested. See the repository release documentation for actual pack/consumer validation results.
