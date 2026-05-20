<script>
  import { onMount, tick } from 'svelte';
  import OpeningGate from '$lib/components/OpeningGate.svelte';
  import FloatingMusicPlayer from '$lib/components/FloatingMusicPlayer.svelte';
  import CountdownSection from '$lib/components/CountdownSection.svelte';
  import CoupleSection from '$lib/components/CoupleSection.svelte';
  import EventSection from '$lib/components/EventSection.svelte';
  import GallerySection from '$lib/components/GallerySection.svelte';
  import RSVPSection from '$lib/components/RSVPSection.svelte';
  import { setupReveal } from '$lib/utils/motion';
  import { siteConfig } from '$lib/data/site';
  import { Heart, Sparkles } from 'lucide-svelte';

  export let data;

  let opened = false;
  let root;
  let musicPlayer;
  $: currentName = data.name || data.guestName || 'Bapak/Ibu/Saudara/i';
  $: guestWords = currentName.split(' ').filter(Boolean);

  async function handleMusicStart() {
    musicPlayer?.play();
  }

  async function handleOpen() {
    opened = true;
    await tick();
  }

  onMount(() => setupReveal());
</script>

<svelte:head>
  <title>{siteConfig.title} | Wedding Invitation</title>
  <meta
    name="description"
    content={`Undangan pernikahan ${siteConfig.bride.short} dan ${siteConfig.groom.short} untuk ${data.name}.`}
  />
  <link rel="icon" type="image/png" href="/weddingIcon.png" />
</svelte:head>

<FloatingMusicPlayer bind:this={musicPlayer} src={siteConfig.musicSrc} />

<div class="relative overflow-x-hidden">

  <OpeningGate
    guestName={currentName}
    {opened}
    on:start={handleMusicStart}
    on:open={handleOpen}
  />

  <main class={`transition-all duration-700 ${opened ? 'opacity-100 blur-0' : 'pointer-events-none translate-y-8 opacity-30 blur-md'}`}>
    <section class="relative min-h-screen overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style={`background-image:linear-gradient(180deg, rgba(42,24,15,0.16), rgba(42,24,15,0.72)), url('${siteConfig.heroImage}')`}
      ></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),transparent_24%),linear-gradient(135deg,rgba(198,155,88,0.1),transparent_40%)]"></div>
      <img src="/floral-corner.svg" alt="" class="ornament-corner left-0 top-0 rotate-180" />
      <img src="/floral-corner.svg" alt="" class="ornament-corner bottom-0 right-0" />

      <div class="shell relative z-10 flex min-h-screen items-center py-8 ">
        <div bind:this={root} class="glass-card mx-auto w-full max-w-xl px-6 py-10 text-center text-gold sm:px-8 sm:py-12">
          <p data-opening-item class="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-gold/90">
            <Sparkles size={14} />
            The Wedding Of
          </p>
      <p data-opening-item class="mt-6 text-sm uppercase tracking-[0.34em] text-white/70">
            {siteConfig.subtitle}
          </p>
          <h1 data-opening-item class="mt-4 font-display text-6xl leading-[0.88] text-gold sm:text-7xl">
            {siteConfig.bride.short}
            <span class="mx-2 text-gold">&</span>
            {siteConfig.groom.short}
          </h1>
      <p data-opening-item class="mx-auto mt-5 max-w-md text-base leading-7 text-white">
            {siteConfig.openingLine}
          </p>
          <div data-opening-item class="mx-auto mt-7 max-w-sm rounded-[1.75rem] border border-gold/20 bg-white/10 px-5 py-5 backdrop-blur-xl">
            <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold/60">Kepada Yth.</p>
            <p class="mt-3 font-display text-3xl leading-tight text-gold" aria-label={data.name}>
              {#each guestWords as word}
                <span class="inline-block overflow-hidden">
                  <span class="guest-word inline-block">{word}&nbsp;</span>
                </span>
              {/each}
            </p>
          </div>
      <p data-opening-item class="mx-auto mt-6 max-w-md text-base leading-7 text-white">
            {siteConfig.invitationLine}
          </p>
        </div>
      </div>
    </section>

    <section class="shell relative z-10 py-10">
      <div data-reveal class="glass-card rounded-[2.25rem] px-6 py-8 text-center shadow-velvet sm:px-8">
        <p class="text-[0.72rem] uppercase tracking-[0.34em] text-gold">Personal Invitation</p>
        <h2 class="mt-4 font-display text-4xl text-bark sm:text-5xl">Dear {currentName}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-cocoa/76">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir untuk
          memberikan doa restu pada acara pernikahan kami.
        </p>
      </div>
    </section>

    <section class="shell relative z-10 py-12 text-center">
      <div data-reveal class="max-w-2xl mx-auto space-y-4">
        <p class="text-cocoa/80 text-base leading-7 font-serif italic">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <p class="text-gold font-semibold uppercase tracking-[0.2em] text-base">
          Q.S Ar-Rum : 21
        </p>
      </div>
    </section>

    <CoupleSection bride={siteConfig.bride} groom={siteConfig.groom} />
    <CountdownSection targetDate={siteConfig.dateISO} />
    <EventSection
      events={siteConfig.events}
      location={siteConfig.locationLabel}
      address={siteConfig.address}
      mapEmbed={siteConfig.mapEmbed}
      mapUrl={siteConfig.mapUrl}
    />
    <GallerySection images={siteConfig.gallery} />
    <RSVPSection defaultName={data.name !== 'Bapak/Ibu/Saudara/i' ? data.name : ''} />
  </main>
</div>
