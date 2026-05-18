import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'wedding-music-state';

function createMusicStore() {
  const { subscribe, set, update } = writable({
    playing: false,
    currentTime: 0,
    hydrated: false
  });

  return {
    subscribe,
    hydrate() {
      if (!browser) {
        return;
      }

      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        set({
          playing: Boolean(saved.playing),
          currentTime: Number(saved.currentTime) || 0,
          hydrated: true
        });
      } catch {
        set({ playing: false, currentTime: 0, hydrated: true });
      }
    },
    setPlaying(playing) {
      update((state) => ({ ...state, playing }));
    },
    setCurrentTime(currentTime) {
      update((state) => ({ ...state, currentTime }));
    },
    persist(state) {
      if (!browser) {
        return;
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ playing: state.playing, currentTime: state.currentTime })
      );
    }
  };
}

export const musicState = createMusicStore();
