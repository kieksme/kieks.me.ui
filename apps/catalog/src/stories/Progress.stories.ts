import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/Progress', component: PrimitiveExample };
export const Hell = { args: { kind: 'Progress', theme: 'light' } };
export const Dunkel = { args: { kind: 'Progress', theme: 'dark' } };
export const Leer = { args: { kind: 'Progress', progressValue: 0 } };
export const Vollstaendig = { args: { kind: 'Progress', progressValue: 20 } };
export const Begrenzt = { args: { kind: 'Progress', progressValue: 99 } };
