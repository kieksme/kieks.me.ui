import Example from '../components/Example.astro';
export default { title: 'Bausteine/Heading', component: Example };
export const Hell = { args: { kind: 'Heading', theme: 'light' } };
export const Dunkel = { args: { kind: 'Heading', theme: 'dark' } };
export const Akzent = { args: { kind: 'Heading', accent: true } };
