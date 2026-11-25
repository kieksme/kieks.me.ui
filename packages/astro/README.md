# @kieksme/kieksme-astro

Astro source-component package for kieks.me, version 0.2.0. It contains 22 general components and 17 website-compatible components. Components are exported as `.astro` sources so the consuming Astro build handles their compilation and bundled SVG assets.

```astro
---
import '@kieksme/kieksme-tokens/css';
import '@kieksme/kieksme-astro/styles.css';
import '@kieksme/kieksme-astro/fonts.css'; // optional self-hosted fonts
import Heading from '@kieksme/kieksme-astro/components/Heading';
import Card from '@kieksme/kieksme-astro/components/Card';
---
<Heading>Gemeinsam weiterdenken.</Heading>
<Card title="Ein gemeinsamer Anfang"><p>Inhalte bleiben im jeweiligen Produkt.</p></Card>
```

`@kieksme/kieksme-tokens` is an exact-version dependency. Consumers supply Astro through the peer dependency. No Tailwind installation is required by these components. Fonts are consumer-controlled: optionally import `@kieksme/kieksme-astro/fonts.css` to self-host Hanken Grotesk and Source Sans 3 through pinned `@fontsource` dependencies, or supply your own licensed font loading. Preserve the upstream OFL notices. Logo SVGs are included unchanged; see LICENSES.md and the original GPL text for their distinct provenance.

The declared Astro peer range is a compatibility target, not evidence that every version has been tested. See the repository release documentation for actual pack/consumer validation results.

General components also include Lead, TextLink, FormField, TextInput, Textarea, Select, Checkbox, RadioGroup, StatusMessage, Progress, Accordion, EmptyState, PrevNextNavigation, MetadataList, ThemeToggle, Dialog and CopyButton. Button and Card expose typed variants, sizes/spacing, shadows and native attributes. Content is explicit; example text lives in the catalog rather than production defaults.

Website-compatible components are available from `@kieksme/kieksme-astro/website/<Name>` and preserve the existing Heading, Button, Lead, TextLink, Note, Logo, Marker, Sticker, Burst, Flames, Halftone, ZigzagDivider, FaqItem, FeatureCard, ServiceCard, SpeechBubble and StepCard contracts. Website Note is a development/editorial marker, not a public status message.

See the repository's `docs/primitive-api.md` and `docs/website-extraction.md` for props, slots, CSS layer integration, asset provenance and migration constraints. Examples in the Astrobook catalog cover light/dark, errors, disabled/hidden states, and Card/Button variants. Authentication, data loading and quiz decisions remain consumer responsibilities.
