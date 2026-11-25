import Example from '../components/Example.astro';
export default { title: 'Bausteine/Button', component: Example };
export const Hell = { args: { kind: 'Button', theme: 'light' } };
export const Dunkel = { args: { kind: 'Button', theme: 'dark' } };
export const Sekundaer = { args: { kind: 'Button', variant: 'secondary' } };
export const Deaktiviert = { args: { kind: 'Button', disabled: true, label: 'Noch nicht verfügbar' } };
