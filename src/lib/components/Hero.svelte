<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { animateHero } from '$lib/utils/motion';

  export let guestName = 'Honored Guest';
  export let opened = false;

  const dispatch = createEventDispatcher();
  let hero;
  let heroImage;

  onMount(() => {
    const nodes = Array.from(hero.querySelectorAll('[data-hero-item]'));
    const cleanup = animateHero(nodes);
    return cleanup;
  });

  function openInvitation() {
    dispatch('open');
  }
</script>

<section
  bind:this={hero}
  class="relative isolate flex min-h-screen items-center overflow-hidden px-4 py-6"
>
  <div
    bind:this={heroImage}
    class="absolute inset-0 bg-cover bg-center"
    style="background-image:
      linear-gradient(180deg, rgba(63, 46, 46, 0.34), rgba(63, 46, 46, 0.76)),
      url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=80');"
  ></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,rgba(212,175,55,0.1),transparent_35%)]"></div>

  <div class="section-shell relative z-10 flex min-h-screen items-center py-12">
    <div class="mx-auto max-w-3xl text-center text-cream">
      <p data-hero-item class="eyebrow border-white/20 bg-white/10 text-gold">
        The Wedding Of
      </p>
      <p data-hero-item class="mb-5 text-sm tracking-[0.3em] text-cream/80">
        Dear {guestName}
      </p>
      <h1
        data-hero-item
        class="font-display text-5xl font-semibold leading-[0.92] md:text-7xl"
      >
        Aruna <span class="text-gold">&</span> Bima
      </h1>
      <p data-hero-item class="mx-auto mt-6 max-w-2xl text-sm leading-8 text-cream/80 md:text-base">
        A romantic celebration wrapped in warm heritage, delicate florals, and the timeless grace of Javanese tradition.
      </p>
      <div
        data-hero-item
        class="mt-8 inline-flex flex-col items-center gap-4 sm:flex-row"
      >
        <button
          class="rounded-full bg-gold-gradient px-7 py-4 font-medium text-bark shadow-glow transition duration-300 hover:-translate-y-1"
          on:click={openInvitation}
        >
          Open Invitation
        </button>
        <a
          class="rounded-full border border-white/25 bg-white/10 px-7 py-4 font-medium text-cream backdrop-blur transition duration-300 hover:-translate-y-1"
          href="#details"
        >
          View Event
        </a>
      </div>
    </div>
  </div>

  {#if !opened}
    <div
      class="pointer-events-none absolute bottom-8 left-1/2 z-10 h-14 w-8 -translate-x-1/2 rounded-full border border-white/30"
      transition:fade
    >
      <div class="mx-auto mt-3 h-2 w-2 animate-bounce rounded-full bg-cream"></div>
    </div>
  {/if}
</section>
