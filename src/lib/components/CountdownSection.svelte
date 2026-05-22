<script>
  import { onMount, onDestroy } from 'svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { CalendarDays } from 'lucide-svelte';

  export let targetDate;

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let timer;

  function updateCountdown() {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance > 0) {
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      clearInterval(timer);
    }
  }

  onMount(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<section class="invitation-section relative overflow-hidden text-center" id="countdown">
  <!-- Elegant Image Background with Parallax effect -->
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-fixed opacity-[0.85] sepia-[0.3]"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-bark/80 via-bark/60 to-bark/80"></div>
    <!-- Premium overlay texture -->
    <div class="absolute inset-0 bg-batik-overlay opacity-10 mix-blend-color-burn"></div>
  </div>

  <div class="relative z-10 py-12 text-ivory drop-shadow-md">
    <SectionHeading 
      tag="Menuju Hari Bahagia" 
      title="Menghitung Waktu" 
      description=""
    />
    
    <!-- We need to override the divider and title colors here since they are dark by default -->
    <style>
      #countdown .section-title { color: #FAF7F2; }
      #countdown .section-tag { background: rgba(42, 31, 26, 0.4); border-color: rgba(197, 160, 89, 0.5); color: #d4b57e; }
    </style>

    <div class="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 max-w-4xl mx-auto" data-reveal>
      {#each [
        { label: 'Hari', value: days },
        { label: 'Jam', value: hours },
        { label: 'Menit', value: minutes },
        { label: 'Detik', value: seconds }
      ] as item}
        <div class="glass-card flex flex-col items-center justify-center p-6 sm:p-8 backdrop-blur-md bg-bark/40 border-gold/30 !shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
          <span class="font-display text-5xl sm:text-6xl text-gold font-light drop-shadow-sm tabular-nums tracking-tight">{item.value.toString().padStart(2, '0')}</span>
          <span class="mt-3 text-[0.7rem] uppercase tracking-[0.35em] text-ivory/80 font-medium">{item.label}</span>
        </div>
      {/each}
    </div>

    <div class="mt-16 flex justify-center" data-reveal>
      <a 
        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Renni+%26+Reza&dates=20261114T010000Z/20261114T060000Z&details=Turut+mengundang+Bapak/Ibu/Saudara/i+untuk+hadir+dalam+acara+pernikahan+kami.&location=Gedung+Puspa+Pesona+Taman+Anggrek+TMII`}
        target="_blank"
        rel="noopener noreferrer"
        class="ghost-button !border-gold/40 !text-ivory hover:!bg-gold/20"
      >
        <CalendarDays size={18} class="text-gold" />
        Ingatkan Saya
      </a>
    </div>
  </div>
</section>
