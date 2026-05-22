<script>
  import { fade, fly } from 'svelte/transition';
  import SectionHeading from './SectionHeading.svelte';

  export let wishes = [];
</script>
<section id="wishes" class="section-shell pt-0">

  <!-- Wishes Heading -->
  <div class="mx-auto max-w-3xl text-center">
    <SectionHeading
      eyebrow="Guest Wishes"
      title="Kind words from the people we cherish"
      description="A growing collection of blessings, love, and beautiful notes from our closest family and friends."
    />
  </div>

  <!-- Wishes List -->
  <div class="mt-12 grid gap-4 md:grid-cols-2">
    {#each wishes.slice().reverse() as wish, index (wish.name + wish.timestamp + index)}
      <article
        class="glass-card rounded-[1.75rem] p-6"
        in:fly={{ y: 26, duration: 420, delay: index * 70 }}
        out:fade={{ duration: 180 }}
      >
        <div class="mb-3 flex items-center justify-between gap-3">
          <h3 class="font-display text-2xl text-cocoa dark:text-cream">
            {wish.name}
          </h3>

          <span class="rounded-full bg-gold/10 px-3 py-1 text-[0.7rem] uppercase tracking-[0.3em] text-gold">
            {wish.attendance}
          </span>
        </div>

        <p class="text-sm leading-8 text-cocoa/75 dark:text-cream/75">
          {wish.message}
        </p>

        <p class="mt-4 text-xs uppercase tracking-[0.3em] text-cocoa/45 dark:text-cream/45">
          {wish.timestamp}
        </p>
      </article>
    {/each}
  </div>
</section>