<script>
  import { Pause, Play, Volume2 } from 'lucide-svelte';
  import { scale } from 'svelte/transition';

  export let playing = false;
  export let onToggle = () => {};
</script>

<button
  class="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-white/70 px-4 py-3 text-sm font-medium text-cocoa shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 dark:bg-white/10 dark:text-cream"
  on:click={onToggle}
  aria-pressed={playing}
>
  <span class="grid h-9 w-9 place-items-center rounded-full bg-gold text-bark" transition:scale>
    {#if playing}
      <Pause size={18} />
    {:else}
      <Play size={18} />
    {/if}
  </span>
  <span>{playing ? 'Pause Music' : 'Play Music'}</span>
  <Volume2 size={16} class={playing ? 'animate-pulseSoft' : ''} />
</button>
