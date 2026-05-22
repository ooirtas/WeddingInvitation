<script>
  export let tag = '';
  export let title = '';
  export let description = '';
</script>

<div class="mx-auto max-w-3xl text-center relative z-10" data-reveal>
  {#if tag}
    <div class="mb-8 flex flex-col items-center">
      <img src="/floral-corner.svg" alt="" class="w-12 h-12 opacity-60 mb-2 rotate-45" />
      <p class="section-tag">{tag}</p>
    </div>
  {/if}
  <h2 class="section-title text-balance">{title}</h2>
  <div class="premium-divider"></div>
  {#if description}
    <p class="section-copy text-balance max-w-2xl mx-auto">{description}</p>
  {/if}
</div>
