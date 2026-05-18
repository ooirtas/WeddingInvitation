<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Heart, Sparkles } from 'lucide-svelte';
  import { animate } from 'motion';
  import { siteConfig } from '$lib/data/site';

  export let guestName = 'Bapak/Ibu/Saudara/i';
  export let opened = false;

  const dispatch = createEventDispatcher();
  let root;
  let leftGate;
  let rightGate;
  let content;
  let overlay;

  $: guestWords = guestName.split(' ').filter(Boolean);

  async function handleOpen() {
    // Lock scroll is handled on mount, we unlock it here after animation
    
    // Fade out center content first
    await animate(content, { opacity: 0, transform: 'scale(0.95)' }, { duration: 0.5, easing: [0.22, 1, 0.36, 1] });
    
    // Open gates and fade overlay
    await Promise.all([
      animate(leftGate, { transform: 'translateX(-100%)' }, { duration: 1.5, easing: [0.22, 1, 0.36, 1] }),
      animate(rightGate, { transform: 'translateX(100%)' }, { duration: 1.5, easing: [0.22, 1, 0.36, 1] }),
      animate(overlay, { opacity: 0 }, { duration: 0.8 })
    ]);

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    opened = true;
    dispatch('open');
  }

  onMount(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Initial content fade in
    animate(content, { opacity: [0, 1], transform: ['scale(1.05)', 'scale(1)'] }, { duration: 1, delay: 0.5 });

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  });
</script>

<div bind:this={root} class="fixed inset-0 z-[100] overflow-hidden" class:pointer-events-none={opened}>
  <!-- Background behind gates (revealed content will be seen here) -->
  <div bind:this={overlay} class="absolute inset-0 bg-bark/30 backdrop-blur-sm z-0"></div>

  <!-- Left Gate -->
  <div bind:this={leftGate} class="absolute left-0 top-0 bottom-0 w-1/2 bg-[#fdf8f2] border-r-2 border-gold/40 shadow-2xl z-10 flex items-center justify-end overflow-hidden">
    <div class="absolute inset-0 opacity-[0.04]" style="background-image: url('/batic-pattern.svg'); background-size: 300px;"></div>
    <!-- Javanese Ornament / Line -->
    <div class="absolute right-0 top-0 bottom-0 w-1 bg-gold/20"></div>
    <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 scale-y-150">
      <img src="/floral-corner.svg" alt="" class="w-64 h-64 rotate-90" />
    </div>
  </div>

  <!-- Right Gate -->
  <div bind:this={rightGate} class="absolute right-0 top-0 bottom-0 w-1/2 bg-[#fdf8f2] border-l-2 border-gold/40 shadow-2xl z-10 flex items-center justify-start overflow-hidden">
    <div class="absolute inset-0 opacity-[0.04]" style="background-image: url('/batic-pattern.svg'); background-size: 300px;"></div>
    <!-- Javanese Ornament / Line -->
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gold/20"></div>
    <div class="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 scale-y-150">
      <img src="/floral-corner.svg" alt="" class="w-64 h-64 -rotate-90 scale-x-[-1]" />
    </div>
  </div>

  <!-- Center Content -->
  <div bind:this={content} class="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
    <div class="glass-card max-w-xl w-full p-8 sm:p-12 text-center border border-gold/20 bg-white/90 shadow-card backdrop-blur-xl">
      <p class="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-gold">
        <Sparkles size={14} />
        The Wedding Of
      </p>
      
      <h1 class="mt-6 font-display text-5xl sm:text-6xl text-bark leading-none">
        {siteConfig.bride.short}
        <span class="font-sans text-3xl text-gold block my-2">&</span>
        {siteConfig.groom.short}
      </h1>

      <p class="mt-4 text-sm uppercase tracking-[0.24em] text-cocoa/70">
        {siteConfig.subtitle}
      </p>

      <div class="soft-divider my-8"></div>

      <div class="space-y-2">
        <p class="text-[0.72rem] uppercase tracking-[0.34em] text-cocoa/64">Kepada Yth.</p>
        <p class="font-display text-3xl sm:text-4xl text-bark text-balance">
          {guestName}
        </p>
      </div>

      <button
        class="gold-button mt-10 min-w-[15rem] w-full sm:w-auto hover:shadow-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        on:click={handleOpen}
      >
        <Heart size={16} />
        Buka Undangan
      </button>
    </div>
  </div>
</div>

<style>
  /* Add any specific styles if needed */
</style>
