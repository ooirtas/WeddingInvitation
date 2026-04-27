<script>
  import { createEventDispatcher } from 'svelte';
  import { CheckCircle2, SendHorizonal } from 'lucide-svelte';
  import { fly, scale } from 'svelte/transition';
  import SectionHeading from './SectionHeading.svelte';

  export let defaultName = '';

  const dispatch = createEventDispatcher();

  let name = defaultName;
  let attendance = '';
  let message = '';
  let status = '';
  let success = false;

  function submitForm() {
    status = '';
    success = false;

    if (!name.trim() || !attendance || !message.trim()) {
      status = 'Please complete all fields before sending your RSVP.';
      return;
    }

    if (message.trim().length < 8) {
      status = 'Please leave a slightly longer message so we can treasure it.';
      return;
    }

    dispatch('submit', {
      name: name.trim(),
      attendance,
      message: message.trim()
    });

    status = 'Thank you for your heartfelt response.';
    success = true;
    attendance = '';
    message = '';
  }
</script>

<section id="rsvp" class="section-shell">
  <SectionHeading
    eyebrow="RSVP"
    title="Let us know if you can celebrate with us"
    description="Your presence means the world to us, and your wishes will become part of our treasured memories."
  />

  <form
    class="glass-card grid gap-5 p-5 md:grid-cols-[1fr_1fr] md:p-8"
    on:submit|preventDefault={submitForm}
  >
    <label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream">
      Full Name
      <input
        bind:value={name}
        class="rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream"
        placeholder="Your full name"
      />
    </label>

    <label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream">
      Attendance
      <select
        bind:value={attendance}
        class="rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream"
      >
        <option value="">Choose one</option>
        <option value="Attending">Attending</option>
        <option value="Maybe">Maybe</option>
        <option value="Unable to Attend">Unable to Attend</option>
      </select>
    </label>

    <label class="grid gap-2 text-sm font-medium text-cocoa dark:text-cream md:col-span-2">
      Message
      <textarea
        bind:value={message}
        rows="5"
        class="rounded-[1.25rem] border border-gold/15 bg-white/70 px-4 py-3 text-cocoa outline-none transition focus:border-gold dark:bg-white/5 dark:text-cream"
        placeholder="Share your blessings and kind words"
      ></textarea>
    </label>

    <div class="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        class="inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-6 py-4 font-medium text-bark shadow-glow transition duration-300 hover:-translate-y-1"
        type="submit"
      >
        <SendHorizonal size={18} />
        Send RSVP
      </button>

      <div class="min-h-8">
        {#if status}
          <p class="inline-flex items-center gap-2 text-sm text-bronze dark:text-gold" transition:fly={{ y: 8, duration: 240 }}>
            {#if success}
              <span transition:scale><CheckCircle2 size={16} /></span>
            {/if}
            {status}
          </p>
        {/if}
      </div>
    </div>
  </form>
</section>

<style>
  select option {
    @apply bg-white text-cocoa;
  }

  :global(.dark) select option {
    @apply bg-bark text-cream;
  }
</style>
