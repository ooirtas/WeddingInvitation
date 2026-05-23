<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Heart, Sparkles } from 'lucide-svelte';
  import { animate } from 'motion';
  import { siteConfig } from '$lib/data/site';

  export let guestName = 'Bapak/Ibu/Saudara/i';
  export let opened = false;

  const dispatch = createEventDispatcher();
  let leftGate;
  let rightGate;
  let content;
  let overlay;
  let ribbonKnot;
  let ready = false;

  $: guestWords = guestName.split(' ').filter(Boolean);

  async function handleOpen() {
    dispatch('start');
    
    // Fade out center content first
    try {
      await animate(content, { opacity: 0, transform: 'scale(0.95)' }, { duration: 0.6, easing: [0.22, 1, 0.36, 1] });
    } catch (e) {
      if (content) content.style.opacity = '0';
    }
    
    // Open gates and fade overlay
    try {
      await Promise.all([
        animate(leftGate, { transform: 'translateX(-100%)' }, { duration: 1.8, easing: [0.22, 1, 0.36, 1] }),
        animate(rightGate, { transform: 'translateX(100%)' }, { duration: 1.8, easing: [0.22, 1, 0.36, 1] }),
        animate(overlay, { opacity: 0 }, { duration: 1.0 }),
        animate(
          ribbonKnot,
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.7) rotate(-18deg)' },
          { duration: 0.7, easing: [0.4, 0, 0.2, 1] }
        )
      ]);
    } catch (e) {
      if (leftGate) leftGate.style.transform = 'translateX(-100%)';
      if (rightGate) rightGate.style.transform = 'translateX(100%)';
      if (overlay) overlay.style.opacity = '0';
      if (ribbonKnot) {
        ribbonKnot.style.opacity = '0';
        ribbonKnot.style.transform = 'translate(-50%, -50%) scale(0.7) rotate(-18deg)';
      }
    }

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    opened = true;
    dispatch('open');
  }

  onMount(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Show content with CSS transition instead of motion animate
    setTimeout(() => { ready = true; }, 100);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  });
</script>

<div class="fixed inset-0 z-[100] overflow-hidden bg-bark" class:pointer-events-none={opened} class:opacity-0={opened} style="transition: opacity 0.5s ease;">
  <!-- Background behind gates -->
  <div bind:this={overlay} class="absolute inset-0 bg-bark/60 backdrop-blur-md z-0"></div>

  <!-- Left Gate -->
  <div bind:this={leftGate} class="absolute left-0 top-0 bottom-0 w-1/2 bg-ivory border-r-[3px] border-gold/60 shadow-[20px_0_40px_rgba(42,31,26,0.15)] z-10 flex items-center justify-end overflow-hidden">
    <div class="absolute inset-0 opacity-[0.06]" style="background-image: url('/batik-parang.svg'); background-size: 200px;"></div>
    
    <!-- Wayang silhouette accent -->
    <img src="/wayang-silhouette.svg" alt="" class="absolute bottom-10 left-4 w-40 opacity-20 pointer-events-none" />
    
    <!-- Javanese Ornament / Line -->
    <div class="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10"></div>
    
    <!-- Gate Corners -->
    <img src="/javanese-corner.svg" alt="" class="absolute top-2 right-2 w-24 h-24 opacity-40 rotate-90" />
    <img src="/javanese-corner.svg" alt="" class="absolute bottom-2 right-2 w-24 h-24 opacity-40 rotate-180" />

    <div class="pointer-events-none absolute right-0 top-1/2 h-5 w-[68%] -translate-y-1/2 rounded-l-full border-y border-l border-gold/60 bg-gradient-to-r from-gold/20 via-gold/55 to-gold/80 shadow-[0_6px_18px_rgba(197,160,89,0.28)] sm:h-6"></div>
    <div class="pointer-events-none absolute right-10 top-1/2 h-9 w-7 -translate-y-1/2 rounded-full border border-white/30 bg-white/25 blur-[1px] sm:h-10 sm:w-8"></div>
  </div>

  <!-- Right Gate -->
  <div bind:this={rightGate} class="absolute right-0 top-0 bottom-0 w-1/2 bg-ivory border-l-[3px] border-gold/60 shadow-[-20px_0_40px_rgba(42,31,26,0.15)] z-10 flex items-center justify-start overflow-hidden">
    <div class="absolute inset-0 opacity-[0.05]" style="background-image: url('/batik-kawung.svg'); background-size: 250px;"></div>
    
    <!-- Wayang silhouette accent -->
    <img src="/wayang-silhouette.svg" alt="" class="absolute bottom-10 right-4 w-40 opacity-20 pointer-events-none scale-x-[-1]" />

    <!-- Javanese Ornament / Line -->
    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10"></div>
    
    <!-- Gate Corners -->
    <img src="/javanese-corner.svg" alt="" class="absolute top-2 left-2 w-24 h-24 opacity-40" />
    <img src="/javanese-corner.svg" alt="" class="absolute bottom-2 left-2 w-24 h-24 opacity-40 -rotate-90" />

    <div class="pointer-events-none absolute left-0 top-1/2 h-5 w-[68%] -translate-y-1/2 rounded-r-full border-y border-r border-gold/60 bg-gradient-to-l from-gold/20 via-gold/55 to-gold/80 shadow-[0_6px_18px_rgba(197,160,89,0.28)] sm:h-6"></div>
    <div class="pointer-events-none absolute left-10 top-1/2 h-9 w-7 -translate-y-1/2 rounded-full border border-white/30 bg-white/25 blur-[1px] sm:h-10 sm:w-8"></div>
  </div>

  <div
    bind:this={ribbonKnot}
    class="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-20 sm:w-20"
  >
    <div class="absolute h-7 w-7 rotate-45 rounded-[0.85rem] border border-gold/60 bg-gradient-to-br from-[#f3dfb0] via-gold/95 to-[#b98d3e] shadow-[0_8px_24px_rgba(197,160,89,0.35)] sm:h-9 sm:w-9"></div>
    <div class="absolute left-[0.15rem] h-10 w-5 origin-right -rotate-[30deg] rounded-l-full border border-gold/50 bg-gradient-to-r from-[#f9e9c7] to-gold/90 sm:left-1 sm:h-12 sm:w-6"></div>
    <div class="absolute right-[0.15rem] h-10 w-5 origin-left rotate-[30deg] rounded-r-full border border-gold/50 bg-gradient-to-l from-[#f9e9c7] to-gold/90 sm:right-1 sm:h-12 sm:w-6"></div>
    <div class="absolute top-[2.8rem] h-10 w-[0.35rem] rounded-full bg-gradient-to-b from-gold/95 to-transparent sm:top-[3.4rem] sm:h-12"></div>
  </div>

  <!-- Center Content -->
  <div
    bind:this={content}
    class="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-1000 ease-out"
    class:opacity-0={!ready}
    class:scale-105={!ready}
    class:opacity-100={ready}
    class:scale-100={ready}
  >
    <div class="glass-card max-w-[30rem] w-full rounded-[1.5rem] border border-gold/30 bg-white/95 p-6 text-center shadow-[0_24px_64px_rgba(42,31,26,0.16)] backdrop-blur-2xl sm:max-w-[32rem] sm:p-10">
      <p class="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-deepGold">
        <Sparkles size={14} class="animate-pulseSoft" />
        The Wedding Of
      </p>
      
      <div class="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        <div class="space-y-2">
          <h1 class="font-display text-[3.35rem] leading-[0.92] text-bark sm:text-[3.8rem]">
            {siteConfig.bride.short}
          </h1>
          <p class="mx-auto max-w-[18rem] text-sm font-light leading-relaxed text-deepCocoa/70 sm:max-w-[20rem] sm:text-base">
            {siteConfig.bride.parents}
          </p>
        </div>

        <span class="block font-script text-[3rem] text-gold opacity-90 sm:text-5xl">&amp;</span>

        <div class="space-y-2">
          <h2 class="font-display text-[3.35rem] leading-[0.92] text-bark sm:text-[3.8rem]">
            {siteConfig.groom.short}
          </h2>
          <p class="mx-auto max-w-[18rem] text-sm font-light leading-relaxed text-deepCocoa/70 sm:max-w-[20rem] sm:text-base">
            {siteConfig.groom.parents}
          </p>
        </div>
      </div>

      <div class="soft-divider my-7 opacity-70 sm:my-9"></div>

      <div class="space-y-3 relative z-10">
        <p class="text-[0.65rem] uppercase tracking-[0.34em] text-deepCocoa/50 sm:text-[0.68rem] sm:tracking-[0.4em]">Kepada Yth.</p>
        <p class="font-display text-[1.8rem] leading-tight text-bark text-balance sm:text-[2.2rem]">
          {guestName}
        </p>
      </div>

      <button
        class="gold-button relative z-10 mt-8 w-full px-6 py-4 text-sm sm:mt-10 sm:w-auto sm:px-8 sm:py-5"
        on:click={handleOpen}
      >
        <Heart size={16} />
        Buka Undangan
      </button>
    </div>
  </div>
</div>
