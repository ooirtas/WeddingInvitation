<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import SectionHeading from './SectionHeading.svelte';

  const targetDate = new Date('2027-02-14T08:00:00+07:00');
  let remaining = { days: '00', hours: '00', minutes: '00', seconds: '00' };

  function updateCountdown() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      remaining = { days: '00', hours: '00', minutes: '00', seconds: '00' };
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    remaining = {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0')
    };
  }

  onMount(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  });

  const items = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Minutes' },
    { key: 'seconds', label: 'Seconds' }
  ];
</script>

<section id="countdown" class="section-shell">
  <SectionHeading
    eyebrow="Save The Date"
    title="Counting every moment until forever"
    description="A gentle ticking reminder that our special day is getting closer."
  />

  <div class="glass-card grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:p-6">
    {#each items as item, index}
      <div
        class="rounded-[1.75rem] bg-white/60 px-4 py-6 text-center dark:bg-white/5"
        transition:fade={{ duration: 700, delay: index * 100 }}
      >
        <div class="font-display text-5xl text-cocoa dark:text-cream md:text-6xl">
          {#key remaining[item.key]}
            <span in:fade={{ duration: 240 }} out:fade={{ duration: 180 }}>{remaining[item.key]}</span>
          {/key}
        </div>
        <p class="mt-2 text-xs uppercase tracking-[0.35em] text-gold">{item.label}</p>
      </div>
    {/each}
  </div>
</section>
