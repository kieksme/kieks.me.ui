import PrimitiveExample from '../components/PrimitiveExample.astro';
export default { title: 'Varianten/Button', component: PrimitiveExample };
export const Klein = { args: { kind: 'Button', size: 's' } };
export const Gross = { args: { kind: 'Button', size: 'l' } };
export const Ghost = { args: { kind: 'Button', variant: 'ghost', shadow: 'none' } };
export const SekundaerDunkel = { args: { kind: 'Button', theme: 'dark', variant: 'secondary' } };
export const Deaktiviert = { args: { kind: 'Button', disabled: true } };
