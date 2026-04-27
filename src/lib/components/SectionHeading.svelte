<script>
  export let eyebrow = '';
  export let title = '';
  export let description = '';
</script>

<div class="mx-auto mb-12 max-w-3xl text-center">
  <p class="eyebrow">{eyebrow}</p>
  <h2 class="section-title">{title}</h2>
  {#if description}
    <p class="mt-4 text-sm leading-8 text-cocoa/75 dark:text-cream/75 md:text-base">
      {description}
    </p>
  {/if}
</div>
