import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Varianten/Card', component: PrimitiveExample };
export const Surface = { args: { kind: 'Card' } };
export const Muted = { args: { kind: 'Card', variant: 'muted', shadow: 'none' } };
export const Brand = { args: { kind: 'Card', variant: 'brand', shadow: 'ink' } };
export const Kompakt = { args: { kind: 'Card', padding: 's', shadow: 'none' } };
export const GrossDunkel = { args: { kind: 'Card', theme: 'dark', padding: 'l' } };
