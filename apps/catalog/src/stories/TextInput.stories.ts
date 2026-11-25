import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/TextInput', component: PrimitiveExample };
export const Hell = { args: { kind: 'TextInput', theme: 'light' } };
export const Dunkel = { args: { kind: 'TextInput', theme: 'dark' } };
export const Deaktiviert = { args: { kind: 'TextInput', disabled: true } };
