<script>
  import { MoonStar, SunMedium } from 'lucide-svelte';
  export let darkMode = false;
  export let onToggle = () => {};
</script>

<button
  class="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/70 px-4 py-3 text-sm font-medium text-cocoa shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 dark:bg-white/10 dark:text-cream"
  on:click={onToggle}
>
  {#if darkMode}
    <MoonStar size={16} />
    <span>Dark</span>
  {:else}
    <SunMedium size={16} />
    <span>Light</span>
  {/if}
</button>
