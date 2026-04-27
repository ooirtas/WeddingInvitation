<script>
  import { fade, scale } from 'svelte/transition';
  import { X } from 'lucide-svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { gallery } from '$lib/data/invitation';

  let activeImage = null;

  function openLightbox(item) {
    activeImage = item;
  }

  function closeLightbox() {
    activeImage = null;
  }
</script>

<section id="gallery" class="section-shell">
  <SectionHeading
    eyebrow="Gallery"
    title="Glimpses of our sweetest moments"
    description="A visual keepsake of the tenderness, glow, and joy that carry our story."
  />

  <div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
    {#each gallery as item, index}
      <button
        class="group mb-4 w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/50 text-left shadow-velvet backdrop-blur transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
        on:click={() => openLightbox(item)}
      >
        <img
          class="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          src={item.src}
          alt={item.alt}
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </button>
    {/each}
  </div>

  {#if activeImage}
    <div
      class="fixed inset-0 z-[110] flex items-center justify-center bg-bark/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      transition:fade={{ duration: 220 }}
      on:click|self={closeLightbox}
      on:keydown={(event) => event.key === 'Escape' && closeLightbox()}
    >
      <div
        class="relative max-w-5xl"
        transition:scale={{ duration: 260, start: 0.96 }}
      >
        <button
          class="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-cream"
          on:click={closeLightbox}
        >
          <X size={18} />
        </button>
        <img
          class="max-h-[88vh] rounded-[2rem] object-contain shadow-velvet"
          src={activeImage.src}
          alt={activeImage.alt}
        />
      </div>
    </div>
  {/if}
</section>
