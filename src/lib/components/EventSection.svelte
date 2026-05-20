<script>
  import { CalendarDays, Clock3, MapPin, ExternalLink } from 'lucide-svelte';
  import SectionHeading from './SectionHeading.svelte';

  export let events = [];
  export let location = '';
  export let address = '';
  export let mapEmbed = '';
  export let mapUrl = '';
</script>

<section class="invitation-section" id="events">
  <SectionHeading
    tag="Event Details"
    title="A day wrapped in tradition, warmth, and celebration"
    description="Mohon doa restu serta kehadiran Anda untuk menyempurnakan kebahagiaan kami."
  />

  <div class="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] items-start">
    <div class="grid gap-6">
      {#each events as event}
        <article data-reveal class="glass-card rounded-[2rem] p-6 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">{event.title}</p>
              <h3 class="mt-3 font-display text-4xl leading-none text-bark">{event.date}</h3>
            </div>
            <span class="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-bronze">{event.time}</span>
          </div>

          <div class="mt-6 grid gap-4 text-base text-cocoa/78">
            <p class="flex items-start gap-3">
              <CalendarDays size={18} class="mt-0.5 text-gold" />
              <span>{event.date}</span>
            </p>
            <p class="flex items-start gap-3">
              <Clock3 size={18} class="mt-0.5 text-gold" />
              <span>{event.time}</span>
            </p>
            <p class="flex items-start gap-3">
              <MapPin size={18} class="mt-0.5 text-gold" />
              <span>{location}</span>
            </p>
          </div>

          <p class="mt-6 text-base leading-7 text-cocoa/72">{event.note}</p>
        </article>
      {/each}
    </div>

    <div data-reveal class="glass-card overflow-hidden rounded-[2rem] p-3 sm:p-4">
      <div class="overflow-hidden rounded-[1.6rem]">
        <iframe
          src={mapEmbed}
          title="Wedding location map"
          loading="lazy"
          class="h-[320px] w-full border-0 sm:h-[520px]"
        ></iframe>
      </div>
      <div class="p-4 sm:p-5">
        <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">Location</p>
        <h3 class="mt-3 font-display text-3xl text-bark">{location}</h3>
        <p class="mt-3 text-base leading-7 text-cocoa/76">{address}</p>
        <a
          class="gold-button mt-5"
          href={mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location} ${address}`)}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in Maps
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </div>
</section>
