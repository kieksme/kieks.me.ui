import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/RadioGroup', component: PrimitiveExample };
export const Hell = { args: { kind: 'RadioGroup', theme: 'light' } };
export const Dunkel = { args: { kind: 'RadioGroup', theme: 'dark' } };
export const Deaktiviert = { args: { kind: 'RadioGroup', disabled: true } };
