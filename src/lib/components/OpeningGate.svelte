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
        animate(overlay, { opacity: 0 }, { duration: 1.0 })
      ]);
    } catch (e) {
      if (leftGate) leftGate.style.transform = 'translateX(-100%)';
      if (rightGate) rightGate.style.transform = 'translateX(100%)';
      if (overlay) overlay.style.opacity = '0';
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
  </div>

  <!-- Center Content -->
  <div
    bind:this={content}
    class="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-out"
    class:opacity-0={!ready}
    class:scale-105={!ready}
    class:opacity-100={ready}
    class:scale-100={ready}
  >
    <div class="glass-card max-w-[34rem] w-full p-10 sm:p-14 text-center bg-white/95 shadow-[0_30px_80px_rgba(42,31,26,0.2)] backdrop-blur-2xl rounded-2xl border border-gold/30">
      <p class="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-deepGold">
        <Sparkles size={14} class="animate-pulseSoft" />
        The Wedding Of
      </p>
      
      <h1 class="mt-8 font-display text-5xl sm:text-[4rem] text-bark leading-[0.9]">
        {siteConfig.bride.short}
        <span class="font-script text-4xl sm:text-5xl text-gold block my-3 opacity-90">&amp;</span>
        {siteConfig.groom.short}
      </h1>

      <div class="mt-6 text-base leading-relaxed text-deepCocoa/70 font-light">
        <p>{siteConfig.bride.parents}</p>
        <p class="text-xs uppercase tracking-widest text-gold/60 my-1">&amp;</p>
        <p>{siteConfig.groom.parents}</p>
      </div>

      <div class="soft-divider my-10 opacity-70"></div>

      <div class="space-y-3 relative z-10">
        <p class="text-[0.68rem] uppercase tracking-[0.4em] text-deepCocoa/50">Kepada Yth.</p>
        <p class="font-display text-[2rem] sm:text-[2.5rem] text-bark text-balance">
          {guestName}
        </p>
      </div>

      <button
        class="gold-button mt-12 w-full sm:w-auto relative z-10"
        on:click={handleOpen}
      >
        <Heart size={16} />
        Buka Undangan
      </button>
    </div>
  </div>
</div>
