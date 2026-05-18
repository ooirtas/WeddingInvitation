<script>
  import { Copy, Download, MessageCircle, Link2 } from 'lucide-svelte';
  import { siteConfig } from '$lib/data/site';
  import {
    buildInvitationLink,
    buildWhatsappDeepLink,
    buildWhatsappMessage
  } from '$lib/utils/invitation';

  let baseDomain = siteConfig.defaultDomain;
  let rawGuests = 'Om Narno dan Keluarga\nIbu Lestari\nMas Rian & Keluarga';
  let copied = '';

  $: guests = rawGuests
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  $: rows = guests.map((guest) => {
    const link = buildInvitationLink(baseDomain, guest);
    const message = buildWhatsappMessage(baseDomain, guest, `${siteConfig.bride.short} & ${siteConfig.groom.short}`);

    return {
      guest,
      link,
      message,
      whatsappUrl: buildWhatsappDeepLink(message)
    };
  });

  $: bulkExport = rows
    .map((row) => [row.guest, row.link, row.whatsappUrl, row.message.replace(/\n/g, ' ')].join('\t'))
    .join('\n');

  async function copyText(value, label) {
    await navigator.clipboard.writeText(value);
    copied = label;
    setTimeout(() => {
      if (copied === label) {
        copied = '';
      }
    }, 1600);
  }
</script>

<svelte:head>
  <title>Admin Generator | {siteConfig.title}</title>
</svelte:head>

<div class="shell py-10 sm:py-14">
  <div class="mx-auto max-w-5xl">
    <div class="text-center">
      <p class="section-tag">Admin Utility</p>
      <h1 class="section-title mt-5">Generate personalized invitation links</h1>
      <div class="soft-divider"></div>
      <p class="section-copy mx-auto max-w-2xl">
        Tempel daftar nama tamu, lalu sistem akan membuat link undangan personal, pesan WhatsApp,
        deep link WhatsApp, dan export massal yang siap dibagikan.
      </p>
    </div>

    <section class="mt-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <div class="glass-card rounded-[2rem] p-6 sm:p-8">
        <label class="grid gap-2 text-sm font-medium text-cocoa">
          Base Domain
          <input bind:value={baseDomain} class="rounded-[1.2rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold" placeholder="https://domain.com" />
        </label>

        <label class="mt-5 grid gap-2 text-sm font-medium text-cocoa">
          Guest List
          <textarea bind:value={rawGuests} rows="12" class="rounded-[1.4rem] border border-gold/15 bg-white/70 px-4 py-3 outline-none focus:border-gold" placeholder="Satu nama per baris"></textarea>
        </label>

        <div class="mt-5 flex flex-wrap gap-3">
          <button class="gold-button" on:click={() => copyText(bulkExport, 'bulk')}>
            <Download size={16} />
            Copy Bulk Export
          </button>
          <button class="rounded-full border border-gold/20 bg-white/70 px-5 py-3 text-sm font-semibold text-cocoa transition hover:border-gold hover:text-gold" on:click={() => copyText(rows.map((row) => row.message).join('\n\n'), 'messages')}>
            <Copy size={16} />
            Copy All Messages
          </button>
        </div>

        {#if copied}
          <p class="mt-4 text-sm text-bronze">Copied: {copied}</p>
        {/if}
      </div>

      <div class="grid gap-4">
        {#each rows as row}
          <article class="glass-card rounded-[1.8rem] p-5 sm:p-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">Guest</p>
                <h2 class="mt-2 font-display text-3xl text-bark">{row.guest}</h2>
              </div>
              <a
                href={row.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                class="gold-button"
              >
                <MessageCircle size={16} />
                Open WhatsApp
              </a>
            </div>

            <div class="mt-5 grid gap-4">
              <div class="rounded-[1.3rem] border border-gold/15 bg-white/60 p-4">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa/60">Invitation Link</p>
                  <button class="text-gold" on:click={() => copyText(row.link, row.guest + '-link')} aria-label="Copy link">
                    <Link2 size={16} />
                  </button>
                </div>
                <p class="mt-2 break-all text-sm text-cocoa/78">{row.link}</p>
              </div>

              <div class="rounded-[1.3rem] border border-gold/15 bg-white/60 p-4">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa/60">WhatsApp Message</p>
                  <button class="text-gold" on:click={() => copyText(row.message, row.guest + '-message')} aria-label="Copy message">
                    <Copy size={16} />
                  </button>
                </div>
                <pre class="mt-2 whitespace-pre-wrap font-sans text-sm leading-7 text-cocoa/78">{row.message}</pre>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </div>
</div>
