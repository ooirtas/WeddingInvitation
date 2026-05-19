<script>
  import { X } from 'lucide-svelte';
  import SectionHeading from './SectionHeading.svelte';

  export let images = [];

  let activeImage = null;
</script>

<section class="invitation-section" id="gallery">
  <SectionHeading
    tag="Gallery"
    title="Fragments of a love story, held in light"
    description="Setiap bingkai menyimpan rasa syukur, doa, dan perjalanan yang membawa kami sampai di hari ini."
  />

  <div class="mt-10 columns-2 gap-4 space-y-4 md:columns-3">
    {#each images as image}
      <button
        data-reveal
        class="group relative block w-full overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/50"
        on:click={() => (activeImage = image)}
      >
        <enhanced:img
          src={image.src}
          alt={image.alt}
          class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-bark/15 to-transparent opacity-0 transition group-hover:opacity-100"></div>
      </button>
    {/each}
  </div>

  {#if activeImage}
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        class="absolute inset-0 bg-bark/75 backdrop-blur-md"
        on:click={() => (activeImage = null)}
        aria-label="Close image preview"
      ></button>
      <div
        class="relative z-10 max-h-[90vh] max-w-4xl overflow-hidden rounded-[2rem] bg-white p-2 shadow-velvet"
        on:click|stopPropagation
        role="presentation"
      >
        <button
          class="absolute right-4 top-4 z-10 rounded-full bg-white/85 p-2 text-cocoa shadow-md"
          on:click={() => (activeImage = null)}
          aria-label="Close image"
        >
          <X size={18} />
        </button>
        <enhanced:img src={activeImage.src} alt={activeImage.alt} class="max-h-[86vh] w-full rounded-[1.5rem] object-cover" />
      </div>
    </div>
  {/if}
</section>
