import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Primitives/ThemeToggle', component: PrimitiveExample };
export const Hell = { args: { kind: 'ThemeToggle', theme: 'light' } };
export const Dunkel = { args: { kind: 'ThemeToggle', theme: 'dark' } };
