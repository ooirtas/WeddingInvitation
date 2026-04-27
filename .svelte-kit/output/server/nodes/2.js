import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.BqzJSCN6.js","_app/immutable/chunks/BR8sfZV5.js","_app/immutable/chunks/BIbEgZe0.js","_app/immutable/chunks/CjzXyzOB.js","_app/immutable/chunks/Cs96LPXr.js","_app/immutable/chunks/CAYlzx2u.js","_app/immutable/chunks/C9jW9pa6.js"];
export const stylesheets = ["_app/immutable/assets/2.fU-86Dnx.css"];
export const fonts = [];
