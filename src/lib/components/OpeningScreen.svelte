<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Heart, Sparkles } from 'lucide-svelte';
  import { animateOpening } from '$lib/utils/motion';
  import { siteConfig } from '$lib/data/site';

  export let guestName = 'Bapak/Ibu/Saudara/i';
  export let opened = false;

  const dispatch = createEventDispatcher();
  let root;
  $: guestWords = guestName.split(' ').filter(Boolean);

  onMount(() => {
    animateOpening(root);
  });
</script>

<section class="relative min-h-screen overflow-hidden">
  <div
    class="absolute inset-0 bg-cover bg-center"
    style={`background-image:linear-gradient(180deg, rgba(42,24,15,0.16), rgba(42,24,15,0.72)), url('${siteConfig.heroImage}')`}
  ></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),transparent_24%),linear-gradient(135deg,rgba(198,155,88,0.1),transparent_40%)]"></div>
  <img src="/floral-corner.svg" alt="" class="ornament-corner left-0 top-0 rotate-180" />
  <img src="/floral-corner.svg" alt="" class="ornament-corner bottom-0 right-0" />

  <div class="shell relative z-10 flex min-h-screen items-center py-8">
    <div bind:this={root} class="glass-card mx-auto w-full max-w-xl px-6 py-10 text-center text-white sm:px-8 sm:py-12">
      <p data-opening-item class="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-white/90">
        <Sparkles size={14} />
        The Wedding Of
      </p>
      <p data-opening-item class="mt-6 text-sm uppercase tracking-[0.34em] text-white/70">
        {siteConfig.subtitle}
      </p>
      <h1 data-opening-item class="mt-4 font-display text-6xl leading-[0.88] text-white sm:text-7xl">
        {siteConfig.bride.short}
        <span class="mx-2 text-gold">&</span>
        {siteConfig.groom.short}
      </h1>
      <p data-opening-item class="mx-auto mt-5 max-w-md text-sm leading-7 text-white/78">
        {siteConfig.openingLine}
      </p>
      <div data-opening-item class="mx-auto mt-7 max-w-sm rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-xl">
        <p class="text-[0.72rem] uppercase tracking-[0.34em] text-white/64">Kepada Yth.</p>
        <p class="mt-3 font-display text-3xl leading-tight text-white" aria-label={guestName}>
          {#each guestWords as word}
            <span class="inline-block overflow-hidden">
              <span class="guest-word inline-block">{word}&nbsp;</span>
            </span>
          {/each}
        </p>
      </div>
      <p data-opening-item class="mx-auto mt-6 max-w-md text-sm leading-7 text-white/74">
        {siteConfig.invitationLine}
      </p>
      <button
        data-opening-item
        class="gold-button mt-8 min-w-[13rem]"
        on:click={() => dispatch('open')}
      >
        <Heart size={16} />
        Open Invitation
      </button>
    </div>
  </div>

  {#if !opened}
    <div class="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/25 px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/70">
      Scroll to explore
    </div>
  {/if}
</section>
