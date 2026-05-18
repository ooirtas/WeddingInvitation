<script>
  import SectionHeading from './SectionHeading.svelte';

  export let items = [];
</script>

<section class="invitation-section" id="story">
  <SectionHeading
    tag="Love Story"
    title="A journey shaped by time, prayer, and growing trust"
    description="Kami percaya setiap langkah kecil yang dijaga dengan baik akan membawa dua hati ke tempat yang sama."
  />

  <div class="relative mt-12">
    <div class="absolute left-[1.1rem] top-0 h-full w-px bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10 sm:left-1/2 sm:-translate-x-1/2"></div>

    <div class="grid gap-8">
      {#each items as item, index}
        <article
          data-reveal
          class={`relative grid gap-4 sm:grid-cols-2 ${index % 2 ? 'sm:[&>*:first-child]:order-2' : ''}`}
        >
          <div class={`sm:px-10 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}>
            <div class="glass-card rounded-[1.8rem] p-6">
              <p class="text-[0.72rem] uppercase tracking-[0.32em] text-gold">{item.year}</p>
              <h3 class="mt-3 font-display text-3xl text-bark">{item.title}</h3>
              <p class="mt-4 text-sm leading-7 text-cocoa/75">{item.description}</p>
            </div>
          </div>
          <div class="relative hidden sm:block"></div>
          <span class="absolute left-[1.1rem] top-7 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-cream bg-gold sm:left-1/2"></span>
        </article>
      {/each}
    </div>
  </div>
</section>
