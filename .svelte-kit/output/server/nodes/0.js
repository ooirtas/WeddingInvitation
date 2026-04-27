

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CGlqMNBT.js","_app/immutable/chunks/BR8sfZV5.js","_app/immutable/chunks/BIbEgZe0.js","_app/immutable/chunks/CjzXyzOB.js"];
export const stylesheets = ["_app/immutable/assets/0.RCXPHpNY.css"];
export const fonts = [];
