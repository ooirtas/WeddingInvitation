<script>
  import { CheckCircle2, LoaderCircle, SendHorizonal, TriangleAlert } from 'lucide-svelte';
  import SectionHeading from './SectionHeading.svelte';
  import { hasRecentSubmission, markSubmission, submitRsvp } from '$lib/utils/rsvp';
  import { siteConfig } from '$lib/data/site';

  export let defaultName = '';

  let name = defaultName;
  let attendance = 'Hadir';
  let guestCount = 1;
  let message = '';
  let loading = false;
  let error = '';
  let showSuccess = false;

  async function handleSubmit() {
    error = '';

    const payload = {
      name: name.trim(),
      attendance,
      guestCount: Number(guestCount),
      message: message.trim()
    };

    if (!payload.name || !payload.attendance || !payload.message) {
      error = 'Mohon lengkapi nama, konfirmasi kehadiran, dan ucapan terlebih dahulu.';
      return;
    }

    if (payload.guestCount < 1 || payload.guestCount > 10) {
      error = 'Jumlah tamu harus di antara 1 sampai 10 orang.';
      return;
    }

    if (hasRecentSubmission(payload)) {
      error = 'RSVP untuk nama ini baru saja dikirim. Silakan tunggu beberapa menit sebelum mencoba lagi.';
      return;
    }

    loading = true;

    try {
      await submitRsvp(payload);
      markSubmission(payload);
      showSuccess = true;
      message = '';
      guestCount = 1;
      attendance = 'Hadir';
    } catch (submissionError) {
      error = submissionError.message;
    } finally {
      loading = false;
    }
  }

  function portal(node) {
    document.body.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    };
  }
</script>

<section class="invitation-section" id="rsvp">
  <SectionHeading
    tag="RSVP"
    title="Konfirmasi kehadiran dan kirim doa terbaik"
    description="Ucapan dan kehadiran Anda akan menjadi bagian yang sangat berarti dalam perayaan ini."
  />

  <div class="mt-12 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
    <aside data-reveal class="glass-card rounded-[2rem] p-6 sm:p-8">
      <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">Info RSVP</p>
      <h3 class="mt-3 font-display text-4xl text-bark">Bantu kami menyiapkan momen terbaik</h3>
      <p class="mt-5 text-sm leading-7 text-cocoa/76">
        Setiap kehadiran memiliki arti yang begitu berharga bagi kami.
Dengan penuh harapan, kami mengundang Anda untuk mengisi harapan dan doa untuk kami di bawah ini sebagai bentuk konfirmasi kehadiran pada momen bahagia kami.
      </p>
      {#if !siteConfig.appScriptEndpoint}
      <div class="mt-6 rounded-[1.5rem] border border-gold/15 bg-white/55 p-5 text-sm leading-7 text-cocoa/72">
        Gunakan environment variable `PUBLIC_GAS_RSVP_ENDPOINT` atau isi `appScriptEndpoint` di
        [site.js](/abs/path/c:/Users/satrio.muhammad_idst/Documents/weddingInvitation/src/lib/data/site.js).
      </div>
      {/if}
    </aside>

    <form data-reveal class="glass-card rounded-[2rem] p-6 sm:p-8" on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="grid gap-2 text-sm font-medium text-cocoa">
          Nama
          <input bind:value={name} class="rounded-[1.2rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold" placeholder="Nama lengkap" />
        </label>

        <label class="grid gap-2 text-sm font-medium text-cocoa">
          Status Kehadiran
          <select bind:value={attendance} class="rounded-[1.2rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold">
            <option value="Hadir">Hadir</option>
            <option value="Masih Diusahakan">Masih Diusahakan</option>
            <option value="Berhalangan">Berhalangan</option>
          </select>
        </label>

        <label class="grid gap-2 text-sm font-medium text-cocoa sm:col-span-2">
          Jumlah Tamu
          <input bind:value={guestCount} type="number" min="1" max="10" class="rounded-[1.2rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold" />
        </label>

        <label class="grid gap-2 text-sm font-medium text-cocoa sm:col-span-2">
          Ucapan dan Doa
          <textarea bind:value={message} rows="5" class="rounded-[1.2rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold" placeholder="Tulis doa dan ucapan terbaik Anda"></textarea>
        </label>
      </div>

      <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button class="gold-button min-w-[11rem]" type="submit" disabled={loading}>
          {#if loading}
            <LoaderCircle size={16} class="animate-spin" />
            Mengirim...
          {:else}
            <SendHorizonal size={16} />
            Kirim RSVP
          {/if}
        </button>

        {#if error}
          <p class="inline-flex items-center gap-2 text-sm text-bronze">
            <TriangleAlert size={16} />
            {error}
          </p>
        {/if}
      </div>
    </form>
  </div>

</section>

{#if showSuccess}
  <div use:portal class="fixed inset-0 z-[70] flex items-center justify-center bg-bark/40 p-4 backdrop-blur-sm">
    <div class="glass-card max-w-md rounded-[2rem] p-8 text-center">
      <span class="mx-auto inline-flex rounded-full bg-gold/10 p-4 text-gold">
        <CheckCircle2 size={30} />
      </span>
      <h3 class="mt-5 font-display text-4xl text-bark">Terima kasih</h3>
      <p class="mt-3 text-sm leading-7 text-cocoa/75">
        RSVP Anda sudah kami terima. Sampai jumpa di hari bahagia kami.
      </p>
      <button class="gold-button mt-6" on:click={() => (showSuccess = false)}>Tutup</button>
    </div>
  </div>
{/if}
