import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/FormField', component: PrimitiveExample };
export const Hell = { args: { kind: 'FormField', theme: 'light' } };
export const Dunkel = { args: { kind: 'FormField', theme: 'dark' } };
export const Fehler = { args: { kind: 'FormField', error: true } };
