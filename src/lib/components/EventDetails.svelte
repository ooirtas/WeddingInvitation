<script>
  import { CalendarDays, Clock3, MapPin, Sparkles, CalendarPlus } from 'lucide-svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { events } from '$lib/data/invitation';
  import { generateCalendarLinks } from '$lib/utils/calendar';
</script>

<section id="details" class="section-shell">
  <SectionHeading
    eyebrow="Wedding Event"
    title="A celebration steeped in warmth and elegance"
    description="Join us for our sacred vows and joyful reception in the heart of Yogyakarta."
  />

  <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
    <div class="grid gap-5">
      {#each events as event}
        <article class="glass-card p-6">
          <div class="mb-5 inline-flex items-center gap-3 rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold">
            <Sparkles size={14} />
            {event.title}
          </div>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <Clock3 size={18} class="mt-1 text-gold" />
              <div>
                <h3 class="font-display text-3xl text-cocoa dark:text-cream">{event.time}</h3>
                <p class="mt-1 text-sm text-cocoa/75 dark:text-cream/75">{event.date}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <MapPin size={18} class="mt-1 text-gold" />
              <p class="text-sm leading-7 text-cocoa/75 dark:text-cream/75">{event.location}</p>
            </div>
            <p class="rounded-[1.5rem] bg-white/55 p-4 text-sm leading-7 text-cocoa/75 dark:bg-white/5 dark:text-cream/75">
              {event.note}
            </p>

            <div class="flex flex-wrap gap-2 pt-2">
              <a
                href={generateCalendarLinks(event).google}
                target="_blank"
                class="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa transition hover:bg-gold/10 dark:bg-white/5 dark:text-cream"
              >
                <CalendarPlus size={14} class="text-gold" />
                Google Calendar
              </a>
              <a
                href={generateCalendarLinks(event).ics}
                download={`${event.title}.ics`}
                class="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa transition hover:bg-gold/10 dark:bg-white/5 dark:text-cream"
              >
                <CalendarPlus size={14} class="text-gold" />
                iCal / Outlook
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div class="glass-card overflow-hidden p-3">
      <div class="rounded-[1.75rem] bg-white/50 p-5 dark:bg-white/5">
        <div class="mb-5 flex items-center gap-3">
          <CalendarDays size={18} class="text-gold" />
          <div>
            <h3 class="font-display text-3xl text-cocoa dark:text-cream">Venue Location</h3>
            <p class="text-sm text-cocoa/70 dark:text-cream/70">Pendopo Agung Larasati</p>
          </div>
        </div>
        <iframe
          class="min-h-[340px] w-full rounded-[1.5rem]"
          title="Wedding venue location"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Keraton%20Yogyakarta&z=14&output=embed"
        ></iframe>
      </div>
    </div>
  </div>
</section>
