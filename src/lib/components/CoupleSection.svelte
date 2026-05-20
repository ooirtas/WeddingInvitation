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
        <div class="relative aspect-[4/5] overflow-hidden">
          <enhanced:img
            src={person.image}
            alt={person.full}
            class="h-full w-full object-cover transition duration-700 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-bark/55 via-bark/10 to-transparent"></div>
        </div>
        <div class="p-6 sm:p-8">
          <p class="text-lg uppercase tracking-[0.34em] text-gold">Mempelai</p>
          <h3 class="mt-3 font-display text-4xl text-bark">{person.full}</h3>
          <p class="mt-3 text-base leading-7 text-cocoa/80">{person.parents}</p>
          <p class="mt-4 text-base leading-7 text-cocoa/72">{person.description}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
