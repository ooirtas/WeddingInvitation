<script>
  import { onMount } from 'svelte';
  import { Volume2, VolumeX, Music } from 'lucide-svelte';
  import { musicState } from '$lib/stores/music';

  export let src;
  
  let audio;
  let showLabel = true;

  export function play() {
    audio?.play().catch(console.error);
    musicState.setPlaying(true);
    
    // Hide label after starting to play
    setTimeout(() => {
      showLabel = false;
    }, 3000);
  }

  function toggle() {
    if ($musicState.playing) {
      audio?.pause();
      musicState.setPlaying(false);
    } else {
      audio?.play().catch(console.error);
      musicState.setPlaying(true);
    }
  }

  onMount(() => {
    // Sync internal state if audio pauses externally (e.g. system interrupt)
    audio.addEventListener('pause', () => musicState.setPlaying(false));
    audio.addEventListener('play', () => musicState.setPlaying(true));
  });
</script>

<audio
  bind:this={audio}
  {src}
  loop
  preload="auto"
></audio>

<div class="fixed bottom-6 right-6 z-[90] flex items-center gap-4">
  {#if showLabel}
    <div class="hidden sm:flex items-center gap-2 rounded-full bg-bark/80 backdrop-blur-md px-4 py-2 border border-gold/30 text-ivory text-xs uppercase tracking-widest shadow-luxury animate-fadeUpSlow">
      <Music size={14} class="text-gold" />
      Lagu Dimainkan
    </div>
  {/if}
  
  <button
    on:click={toggle}
    class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-bark/90 border border-gold/40 text-ivory shadow-[0_10px_25px_rgba(42,31,26,0.4)] backdrop-blur-md transition-all hover:scale-110 hover:bg-bark hover:border-gold z-10"
    aria-label={$musicState.playing ? "Pause music" : "Play music"}
  >
    <!-- Spinning border effect when playing -->
    {#if $musicState.playing}
      <div class="absolute -inset-1 rounded-full border border-gold/30 border-t-gold/80 animate-slowSpin pointer-events-none"></div>
    {/if}

    {#if $musicState.playing}
      <Volume2 size={24} class="text-gold transition-transform group-hover:scale-110" />
    {:else}
      <VolumeX size={24} class="text-ivory/70 transition-transform group-hover:scale-110" />
    {/if}
  </button>
</div>
