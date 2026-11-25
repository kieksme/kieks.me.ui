import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/Textarea', component: PrimitiveExample };
export const Hell = { args: { kind: 'Textarea', theme: 'light' } };
export const Dunkel = { args: { kind: 'Textarea', theme: 'dark' } };
export const Deaktiviert = { args: { kind: 'Textarea', disabled: true } };
