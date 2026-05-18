<script>
  export let tag = '';
  export let title = '';
  export let description = '';
</script>

<div class="mx-auto max-w-2xl text-center">
  {#if tag}
    <p class="section-tag">{tag}</p>
  {/if}
  <h2 class="section-title mt-5 text-balance">{title}</h2>
  <div class="soft-divider"></div>
  {#if description}
    <p class="section-copy text-balance">{description}</p>
  {/if}
</div>
