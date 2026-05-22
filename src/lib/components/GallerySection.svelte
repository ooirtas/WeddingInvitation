<script>
  import SectionHeading from './SectionHeading.svelte';
  import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-svelte';
  import { fade, scale } from 'svelte/transition';

  export let images;

  let activeIndex = 0;
  let isLightboxOpen = false;
  let autoplayInterval;

  function next() {
    activeIndex = (activeIndex + 1) % images.length;
  }

  function prev() {
    activeIndex = (activeIndex - 1 + images.length) % images.length;
  }

  function goTo(index) {
    activeIndex = index;
  }

  function openLightbox(index) {
    activeIndex = index;
    isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
    stopAutoplay();
  }

  function closeLightbox() {
    isLightboxOpen = false;
    document.body.style.overflow = '';
    startAutoplay();
  }

  function handleKeydown(e) {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(next, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }

  import { onMount, onDestroy } from 'svelte';
  
  onMount(() => {
    startAutoplay();
  });

  onDestroy(() => {
    stopAutoplay();
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="invitation-section bg-ivory" id="gallery">
  <SectionHeading 
    tag="Momen Bahagia" 
    title="Galeri Kebersamaan" 
    description=""
  />

  <div class="mt-16 mx-auto max-w-5xl" data-reveal>
    <!-- Main Carousel -->
    <div class="relative overflow-hidden rounded-2xl glass-card p-4 sm:p-6 mb-8 group" on:mouseenter={stopAutoplay} on:mouseleave={startAutoplay} role="region" aria-label="Image Carousel">
      <div class="absolute inset-0 bg-batik-overlay opacity-5 pointer-events-none mix-blend-multiply rounded-2xl"></div>
      
      <div class="relative aspect-[3/4] sm:aspect-video w-full overflow-hidden rounded-xl border border-gold/20 shadow-inner">
        {#each images as image, i}
          <button
            class="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out cursor-zoom-in sepia-[0.1] border-none p-0 bg-transparent block"
            class:opacity-100={i === activeIndex}
            class:opacity-0={i !== activeIndex}
            class:scale-100={i === activeIndex}
            class:scale-110={i !== activeIndex}
            on:click={() => openLightbox(i)}
            aria-label={`View full image ${i + 1}`}
          >
            <enhanced:img
              src={image.src}
              alt={image.alt || `Gallery ${i + 1}`}
              class="w-full h-full object-cover"
            />
          </button>
        {/each}

        <!-- Expand icon overlay -->
        <div class="absolute inset-0 bg-bark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50 shadow-luxury">
            <Maximize2 size={24} />
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button
        on:click={prev}
        class="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 rounded-full bg-white/50 backdrop-blur-md p-3 text-bark transition-all duration-300 hover:bg-gold hover:text-white shadow-elevated border border-gold/20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        on:click={next}
        class="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 rounded-full bg-white/50 backdrop-blur-md p-3 text-bark transition-all duration-300 hover:bg-gold hover:text-white shadow-elevated border border-gold/20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>

    <!-- Thumbnails -->
    <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar justify-start sm:justify-center px-4">
      {#each images as image, i}
        <button
          on:click={() => goTo(i)}
          class="relative h-20 w-20 shrink-0 snap-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 border {i === activeIndex ? 'border-gold shadow-md' : 'border-gold/20 opacity-60 hover:opacity-100'}"
        >
          <enhanced:img src={image.src} alt={image.alt || `Thumbnail ${i + 1}`} class="h-full w-full object-cover sepia-[0.2]" />
          {#if i === activeIndex}
            <div class="absolute inset-0 bg-gold/10 mix-blend-overlay"></div>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Lightbox -->
{#if isLightboxOpen}
  <div
    class="fixed inset-0 z-[200] flex items-center justify-center bg-bark/95 backdrop-blur-sm p-4 sm:p-8"
    transition:fade={{ duration: 300 }}
  >
    <!-- Background ornament -->
    <img src="/batik-parang.svg" alt="" class="absolute inset-0 w-full h-full opacity-5 object-cover pointer-events-none" />

    <button
      on:click={closeLightbox}
      class="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 border border-white/20 backdrop-blur-md"
      aria-label="Close lightbox"
    >
      <X size={24} />
    </button>

    <div class="relative w-full max-w-6xl flex items-center justify-center">
      <button
        on:click={prev}
        class="absolute left-0 sm:-left-16 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/30 border border-white/20 backdrop-blur-md"
      >
        <ChevronLeft size={32} />
      </button>

      {#key activeIndex}
        <enhanced:img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt || `Gallery full ${activeIndex + 1}`}
          class="max-h-[85vh] w-auto max-w-full rounded-lg shadow-2xl border border-gold/30"
        />
      {/key}

      <button
        on:click={next}
        class="absolute right-0 sm:-right-16 z-10 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/30 border border-white/20 backdrop-blur-md"
      >
        <ChevronRight size={32} />
      </button>
    </div>

    <!-- Image Counter -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-display tracking-widest bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
      {activeIndex + 1} / {images.length}
    </div>
  </div>
{/if}

<style>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
