<script>
  import { onDestroy, onMount } from 'svelte';
  import { Pause, Play, Disc3 } from 'lucide-svelte';
  import { browser } from '$app/environment';
  import { musicState } from '$lib/stores/music';

  export let src = '';

  let audio;
  let playing = false;
  let currentTime = 0;
  let unsubscribe = () => {};
  let wasPlayingBeforeVisibilityChange = false;

  async function handleVisibilityChange() {
    if (!audio) return;

    if (document.visibilityState === 'hidden') {
      if (playing) {
        wasPlayingBeforeVisibilityChange = true;
        audio.pause();
        musicState.setPlaying(false);
        musicState.persist({ playing: false, currentTime: audio.currentTime });
      }
    } else if (document.visibilityState === 'visible') {
      if (wasPlayingBeforeVisibilityChange) {
        try {
          await audio.play();
          musicState.setPlaying(true);
          musicState.persist({ playing: true, currentTime: audio.currentTime });
        } catch {
          musicState.setPlaying(false);
        }
        wasPlayingBeforeVisibilityChange = false;
      }
    }
  }

  onMount(() => {
    musicState.hydrate();

    if (audio) {
      audio.volume = 0.1; // 50%
    }

    unsubscribe = musicState.subscribe((state) => {
      playing = state.playing;
      currentTime = state.currentTime;

      if (audio && Math.abs(audio.currentTime - currentTime) > 1.5) {
        audio.currentTime = currentTime;
      }
    });

    queueMicrotask(restorePlayback);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onDestroy(() => {
    unsubscribe();
    if (browser) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  });

  async function toggle() {
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        audio.volume = 0.1;
        await audio.play();
        musicState.setPlaying(true);
        musicState.persist({ playing: true, currentTime: audio.currentTime });
      } catch {
        musicState.setPlaying(false);
      }
      return;
    }

    audio.pause();
    musicState.setPlaying(false);
    musicState.persist({ playing: false, currentTime: audio.currentTime });
  }

  export async function play() {
    if (!audio) {
      return;
    }

    try {
      audio.volume = 0.1;
      await audio.play();
      musicState.setPlaying(true);
      musicState.persist({ playing: true, currentTime: audio.currentTime });
    } catch {
      musicState.setPlaying(false);
    }
  }

  async function restorePlayback() {
    if (!audio || !playing) {
      return;
    }

    try {
      audio.currentTime = currentTime;
      await audio.play();
    } catch {
      musicState.setPlaying(false);
      musicState.persist({ playing: false, currentTime });
    }
  }

  function syncState() {
    if (!audio) {
      return;
    }

    musicState.setCurrentTime(audio.currentTime);
    musicState.persist({ playing: !audio.paused, currentTime: audio.currentTime });
  }
</script>

<audio
  bind:this={audio}
  {src}
  loop
  preload="metadata"
  on:timeupdate={syncState}
  on:pause={syncState}
  on:play={syncState}
></audio>

<button
  class="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-4 py-3 text-sm font-medium text-cocoa shadow-velvet backdrop-blur-xl transition hover:-translate-y-0.5"
  on:click={toggle}
  aria-label={playing ? 'Pause music' : 'Play music'}
>
  <span class={`rounded-full bg-cocoa/5 p-2 text-gold ${playing ? 'animate-slowSpin' : ''}`}>
    <Disc3 size={18} />
  </span>
  <span>{playing ? 'Pause music' : 'Play music'}</span>
  {#if playing}
    <Pause size={16} />
  {:else}
    <Play size={16} />
  {/if}
</button>
