<script>
  import { fade, fly, scale } from 'svelte/transition';
  import SectionHeading from './SectionHeading.svelte';
  import { couple } from '$lib/data/invitation';
</script>

<section id="couple" class="section-shell">
  <div class="ornament-ring left-0 top-20 hidden md:block"></div>
  <div class="ornament-ring bottom-16 right-0 hidden md:block"></div>

  <SectionHeading
    eyebrow="Bride & Groom"
    title="Two hearts becoming one graceful story"
    description="Honoring family, tradition, and a love that feels soft, sincere, and enduring."
  />

  <div class="grid gap-5 md:grid-cols-[1fr_0.75fr_1fr]">
    {#each [couple.bride, couple.groom] as person, index}
      <article
        class="group glass-card overflow-hidden p-4"
        transition:fly={{ y: 40, duration: 650, delay: index * 150 }}
      >
        <div class="overflow-hidden rounded-[1.6rem]">
          <img
            class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            src={person.image}
            alt={person.name}
            loading="lazy"
          />
        </div>
        <div class="p-3 text-center">
          <p class="mt-3 text-xs uppercase tracking-[0.35em] text-gold">{person.role}</p>
          <h3 class="mt-3 font-display text-3xl text-cocoa dark:text-cream">{person.name}</h3>
          <p class="mt-3 text-sm leading-7 text-cocoa/75 dark:text-cream/75">{person.description}</p>
        </div>
      </article>

      {#if index === 0}
        <div
          class="glass-card grid place-items-center px-6 py-10 text-center"
          transition:scale={{ duration: 700 }}
        >
          <div class="space-y-5">
            <div class="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/25 bg-gold/10 text-2xl font-display text-gold">
              A | B
            </div>
            <p class="text-sm leading-8 text-cocoa/75 dark:text-cream/75">
              With the warmth of family blessings and the beauty of ancestral traditions, we invite you to witness a day full of tenderness and joy.
            </p>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</section>
