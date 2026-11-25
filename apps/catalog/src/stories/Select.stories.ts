import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/Select', component: PrimitiveExample };
export const Hell = { args: { kind: 'Select', theme: 'light' } };
export const Dunkel = { args: { kind: 'Select', theme: 'dark' } };
export const Deaktiviert = { args: { kind: 'Select', disabled: true } };
