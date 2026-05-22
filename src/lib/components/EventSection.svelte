<script>
  import SectionHeading from './SectionHeading.svelte';
  import { MapPin, Clock } from 'lucide-svelte';

  export let events;
  export let location;
  export let address;
  export let mapEmbed;
  export let mapUrl;
</script>
<section class="invitation-section relative overflow-hidden bg-warmBeige" id="event">
  <!-- Batik Texture -->
  <div class="bg-batik-overlay pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply"></div>

  <div class="relative z-10">
    <SectionHeading
      tag="Rangkaian Acara"
      title="Waktu & Tempat"
      description="Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu."
    />

    <!-- Event Cards -->
    <div class="mx-auto mt-14 max-w-6xl px-4">
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">

    <!-- LEFT : EVENT -->
    <div class="grid gap-6">
      {#each events as event}
        <div
          class="glass-card group relative flex h-full flex-col justify-center overflow-hidden rounded-[30px] border border-gold/15 bg-white/60 p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10"
          data-reveal
        >
          <!-- Inner Border -->
          <div class="pointer-events-none absolute inset-2 rounded-[24px] border border-gold/20"></div>

          <!-- Top Accent -->
          <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>

          <!-- Ornament -->
          <div class="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/5 blur-3xl"></div>

          <div class="relative z-10 text-center">
            <h3 class="font-display text-[2rem] leading-tight text-bark sm:text-5xl">
              {event.title}
            </h3>

            <div class="my-7 flex justify-center">
              <div class="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            </div>

            <div class="space-y-7">
              <!-- Date -->
              <div class="flex items-start justify-center gap-4 text-deepCocoa/80">
                <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                  <Clock size={18} class="text-gold" />
                </div>

                <div class="text-left leading-relaxed">
                  <p class="font-medium text-bark sm:text-lg">
                    {event.date}
                  </p>

                  <p class="mt-1 text-sm text-deepCocoa/70 sm:text-base">
                    {event.time}
                  </p>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start justify-center gap-4 text-deepCocoa/80">
                <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                  <MapPin size={18} class="text-gold" />
                </div>

                <div class="text-left leading-relaxed">
                  <p class="font-medium text-bark sm:text-lg">
                    {location}
                  </p>

                  <p class="mt-2 max-w-md text-sm leading-relaxed text-deepCocoa/70">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- RIGHT : MAP -->
    <div data-reveal>
      <div class="glass-card h-full overflow-hidden rounded-[32px] border border-gold/15 bg-white/50 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-lg">
        
        <div class="relative h-[320px] overflow-hidden rounded-[28px] border border-gold/15 sm:h-[420px] lg:h-[480px]">

          <!-- Decorative Glow -->
          <div class="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/10 via-transparent to-black/5"></div>

          <iframe
            src={mapEmbed}
            class="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[1.03] opacity-95"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Lokasi Acara"
          ></iframe>

          <!-- Bottom Gradient -->
          <div class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-black/15 via-black/5 to-transparent"></div>

          <!-- Maps Button -->
          <div class="absolute bottom-5 left-1/2 z-10 w-full -translate-x-1/2 px-5">
            <div class="mx-auto w-fit">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="gold-button flex items-center justify-center gap-2 rounded-full border border-white/20 bg-[#c9a15c]/95 px-6 py-3 text-sm tracking-[0.08em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-[#c39a53] sm:px-8 sm:text-base"
              >
                <MapPin size={16} />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  </div>
</section>