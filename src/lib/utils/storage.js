export const wishesKey = 'svelte-wedding-wishes';
export const themeKey = 'svelte-wedding-theme';

export function readStorage(key, fallback) {
  if (typeof localStorage === 'undefined') {
    return fallback;
  }

  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}
