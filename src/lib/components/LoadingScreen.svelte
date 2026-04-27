<script>
  import { fade, scale } from 'svelte/transition';

  export let visible = true;
</script>

{#if visible}
  <div
    class="fixed inset-0 z-[120] grid place-items-center bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.2),transparent_30%),linear-gradient(180deg,#3F2E2E,#1f1616)]"
    transition:fade={{ duration: 500 }}
  >
    <div class="text-center" transition:scale={{ duration: 600, start: 0.86 }}>
      <div class="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full border border-gold/35">
        <div class="h-16 w-16 animate-spin rounded-full border border-dashed border-gold/55"></div>
      </div>
      <p class="font-display text-3xl text-cream">Preparing Your Invitation</p>
      <p class="mt-3 text-xs uppercase tracking-[0.45em] text-cream/70">Gracefully unfolding</p>
    </div>
  </div>
{/if}
