<script>
  import SectionHeading from './SectionHeading.svelte';

  export let bride;
  export let groom;
</script>

<section class="invitation-section" id="couple">
  <SectionHeading
    tag="The Couple"
    title="Two hearts, one graceful beginning"
  />

  <div class="mt-12 grid gap-6 md:grid-cols-2">
    {#each [bride, groom] as person}
      <article data-reveal class="glass-card overflow-hidden rounded-[2rem]">
        <div class="p-6 sm:p-8">
          <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">Mempelai</p>
          <h3 class="mt-3 font-display text-4xl text-bark">{person.full}</h3>
          <p class="mt-3 text-sm leading-7 text-cocoa/80">{person.parents}</p>
          <p class="mt-4 text-sm leading-7 text-cocoa/72">{person.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
