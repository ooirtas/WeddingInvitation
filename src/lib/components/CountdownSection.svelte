<script>
  import { onDestroy } from 'svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { siteConfig } from '$lib/data/site';

  export let targetDate = '';

  const labels = ['Hari', 'Jam', 'Menit', 'Detik'];
  let countdown = [0, 0, 0, 0];

  function updateCountdown() {
    const diff = new Date(targetDate).getTime() - Date.now();
    const remaining = Math.max(diff, 0);

    countdown = [
      Math.floor(remaining / (1000 * 60 * 60 * 24)),
      Math.floor((remaining / (1000 * 60 * 60)) % 24),
      Math.floor((remaining / (1000 * 60)) % 60),
      Math.floor((remaining / 1000) % 60)
    ];
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
  onDestroy(() => clearInterval(interval));

  // Compute calendar URL
  const title = `Pernikahan ${siteConfig.bride.short} & ${siteConfig.groom.short}`;
  const details = `Undangan Pernikahan ${siteConfig.bride.full} & ${siteConfig.groom.full}`;
  const location = siteConfig.locationLabel || siteConfig.address;
  
  const dateObj = new Date(siteConfig.dateISO);
  const startStr = dateObj.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';
  const endDateObj = new Date(dateObj.getTime() + 4 * 60 * 60 * 1000); // 4 hours
  const endStr = endDateObj.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15) + 'Z';

  $: calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
</script>

<section class="invitation-section" id="countdown" data-reveal data-stagger="[data-unit]">
  <SectionHeading
    tag="Save The Date"
    title="Counting the days until forever begins"
    description="Kami menantikan kehadiran Anda untuk menyaksikan awal perjalanan baru kami."
  />

  <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
    {#each countdown as value, index}
      <div data-unit class="glass-card rounded-[1.8rem] px-4 py-6 text-center">
        <p class="font-display text-5xl leading-none text-bark">{String(value).padStart(2, '0')}</p>
        <p class="mt-3 text-[0.72rem] uppercase tracking-[0.32em] text-cocoa/60">{labels[index]}</p>
      </div>
    {/each}
  </div>

  <div class="mt-8 text-center" data-unit>
    <a
      href={calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="gold-button inline-flex items-center gap-2 text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      Tambahkan ke Kalender
    </a>
  </div>
</section>
