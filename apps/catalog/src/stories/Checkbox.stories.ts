import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/Checkbox', component: PrimitiveExample };
export const Hell = { args: { kind: 'Checkbox', theme: 'light' } };
export const Dunkel = { args: { kind: 'Checkbox', theme: 'dark' } };
export const Deaktiviert = { args: { kind: 'Checkbox', disabled: true } };
