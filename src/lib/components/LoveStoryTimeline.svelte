<script>
  import { onMount } from 'svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { timeline } from '$lib/data/invitation';
  import { staggerChildren } from '$lib/utils/motion';

  let timelineRoot;

  onMount(() => {
    if (!timelineRoot) {
      return;
    }

    return staggerChildren(timelineRoot, '[data-story-item]');
  });
</script>

<section id="story" class="section-shell">
  <SectionHeading
    eyebrow="Love Story"
    title="A journey told in soft and meaningful chapters"
    description="From our first meeting to the promise of forever, every step has led us here."
  />

  <div bind:this={timelineRoot} class="relative mx-auto max-w-4xl">
    <div class="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/20 to-transparent md:left-1/2"></div>
    <div class="space-y-6">
      {#each timeline as item, index}
        <article
          data-story-item
          class="relative grid gap-3 md:grid-cols-2 md:items-start md:gap-10"
        >
          <div class={index % 2 === 0 ? 'md:text-right' : 'md:order-2 md:text-left'}>
            <span class="inline-flex rounded-full bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              {item.year}
            </span>
          </div>
          <div class={index % 2 === 0 ? '' : 'md:order-1'}>
            <div class="glass-card rounded-[1.75rem] p-6">
              <div class="absolute left-4 top-7 h-3 w-3 rounded-full bg-gold shadow-[0_0_0_8px_rgba(212,175,55,0.14)] md:left-1/2 md:-translate-x-1/2"></div>
              <h3 class="font-display text-3xl text-cocoa dark:text-cream">{item.title}</h3>
              <p class="mt-3 text-sm leading-8 text-cocoa/75 dark:text-cream/75">{item.description}</p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
