# Primitive API (0.2.0 preparation)

Import components from `@kieksme/kieksme-astro/components/<Name>`. Consumers load tokens and the package styles once. These primitives contain presentation/interaction only; authentication, data loading and business decisions stay in the application.

| Component | Props / slots |
| --- | --- |
| Button | Native button attributes and `href`/`target`/`rel`/`download`; `variant='primary'|'secondary'|'ghost'`, `size='s'|'m'|'l'`, `shadow='ink'|'none'`; default slot takes precedence over `label`. No invented label. Disabled links have no href and leave tab order. |
| Card | Native attributes and `as='article'|'section'|'div'`; `variant='surface'|'muted'|'brand'`, `padding='none'|'s'|'m'|'l'`, `shadow='none'|'ink'|'aqua'`; optional `title`, `text`, `eyebrow`, `titleHref`, `headingLevel=2|3`. Default, header, media and footer slots. No demo defaults; links stay explicit to avoid nested interactive cards. |
| Heading | Native heading attributes, `level=1..6`, `accent=false`; default slot or `text`, with no demo defaults. |
| Note | Native aside attributes, optional `title`/`text`, default slot; no demo defaults. |
| Logo | Numeric `size` for the shared light/dark brand mark. The website-compatible Logo additionally supports original layout, size, animation and variant props under the website export. |
| Lead | `size='l'|'m'`, `tone='primary'|'secondary'|'onColor'`, optional `class`; default slot |
| TextLink | native anchor attributes including required `href`, `arrow=true`, optional `class`; default slot |
| FormField | required `id` (the control ID), required `label`; optional `hint`, `error`, `required`, `class`; default slot contains control. Pass `aria-describedby` with `${id}-hint`/`${id}-error` on the control and `aria-invalid` when error exists. IDs must be unique per page. |
| TextInput | native input attributes; default `type='text'`; optional `class`. No label is invented. |
| Textarea | native textarea attributes, `value?:string`, optional `class`; default slot for initial content if value absent |
| Select | native select attributes, `options?:{value:string,label:string,disabled?:boolean}[]`, `value?:string`, optional `placeholder`, `class`; default slot for optgroups/custom options |
| Checkbox | native input attributes except type, `label:string`, optional `hint`, `error`, `class`; required unique `id` |
| RadioGroup | required `id`, `name`, `label`, `options:{value:string,label:string,disabled?:boolean}[]`; optional `value`, `required`, `disabled`, `hint`, `error`, `class` |
| StatusMessage | `variant='info'|'success'|'error'`, `message?:string`, optional `role='status'|'alert'|'note'`, `class`; default slot. Default error role is alert; other variants status. |
| Progress | `value:number`, `max=100`, `label:string`, `showValue=true`, optional `id`, `class`; clamps finite value to 0..max |
| Accordion | required `title`, optional `open=false`, `class`; default slot |
| EmptyState | required `title`, optional `description`, `class`; default and `actions` slots |
| PrevNextNavigation | optional `previous`/`next` `{href,label}`, `label='Seitennavigation'`, `class` |
| MetadataList | `items:{label:string,value:string}[]`, optional `class` |
| ThemeToggle | `label='Farbdarstellung'`, `persist=false`, `storageKey='kieksme-theme'`, optional `class`; native select with light/dark/system. Changes root data-theme and .dark; dispatches ui:theme-change. |
| Dialog | required unique `id`, `title`, optional `triggerLabel='Öffnen'`, `closeLabel='Schließen'`, `class`; default slot inside dialog, trigger slot text only |
| CopyButton | required `value`, optional `label='Kopieren'`, `successMessage='Kopiert.'`, `errorMessage='Kopieren nicht möglich.'`, `class` |

Shared primitives use ordinary CSS and website design tokens, without Tailwind or project-specific imports. Native controls keep their normal form behaviour. Consumer-provided text is rendered as text, not raw HTML. Each scripted component supports multiple independent instances and Astro client navigation.

## Website-compatible components

`@kieksme/kieksme-astro/website/<Name>` preserves the original website contracts for Heading, Button, Lead, TextLink, Note, Logo, Marker, Sticker, Burst, Flames, Halftone, ZigzagDivider, FaqItem, FeatureCard, ServiceCard, SpeechBubble and StepCard. These compatibility contracts retain the website's visual variants while consumers can move incrementally. Button's icon is a named slot; project-specific icon lookup stays in the consumer wrapper.

The package carries precompiled utility fallbacks in low-priority CSS layers. A Tailwind consumer can scan the packaged website source to preserve its original utility cascade. Tailwind 4 consumers declare `kieksme-website-reset, kieksme-website-utilities` before their own theme/base/components/utilities layers. The package itself does not require Tailwind at runtime.

## Card and Button configuration

`Card`: optional title/text/eyebrow (no demo defaults), `titleHref`, `headingLevel=2|3`, `as=article|section|div`, `variant=surface|muted|brand`, `padding=none|s|m|l`, `shadow=none|ink|aqua`, native attributes/class. Named slots media/header/footer plus default body; header slot replaces title/eyebrow presentation. A title link is confined to the heading so footer actions may remain separate; do not add a nested anchor inside that title.

`Button`: native button attributes, optional href/target/rel/download, optional label (default slot wins), `variant=primary|secondary|ghost`, `size=s|m|l`, `shadow=ink|none`. Disabled links remove href and keyboard focus; submit requires explicit `type=submit`. Defaults retain existing primary/medium/ink appearance.

Native `hidden` remains effective for controls, links, buttons, cards and progress. Progress hides its complete wrapper when requested.
