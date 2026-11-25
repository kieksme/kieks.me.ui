import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/StatusMessage', component: PrimitiveExample };
export const Hell = { args: { kind: 'StatusMessage', theme: 'light' } };
export const Dunkel = { args: { kind: 'StatusMessage', theme: 'dark' } };
