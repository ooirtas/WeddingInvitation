<script>
  export let src;
  export let alt = "Decorative ornament";
  export let className = "";
  export let lazy = true;
</script>

<img
  {src}
  {alt}
  class="pointer-events-none {className}"
  loading={lazy ? 'lazy' : 'eager'}
  decoding="async"
  aria-hidden="true"
/>
