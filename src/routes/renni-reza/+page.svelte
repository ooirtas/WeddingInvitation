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
  $: currentName = data.guestName || 'Bapak/Ibu/Saudara/i';
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
    content={`Undangan pernikahan ${siteConfig.bride.short} dan ${siteConfig.groom.short} untuk ${currentName}.`}
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

  <main class={`transition-all duration-1000 ${opened ? 'opacity-100 blur-0' : 'pointer-events-none translate-y-12 opacity-0 blur-lg'}`}>
    <!-- Hero Section -->
    <section class="relative min-h-[100svh] overflow-hidden">
      <!-- Background Layers -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
        style={`background-image: url('${siteConfig.heroImage}')`}
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-bark/40 via-bark/60 to-bark/90"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.15),transparent_40%)]"></div>
      
      <!-- Ornaments -->
      <img src="/gunungan.svg" alt="" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] opacity-[0.25] pointer-events-none mix-blend-screen" />
      <img src="/floral-corner.svg" alt="" class="absolute top-0 left-0 w-48 opacity-50 mix-blend-screen" />
      <img src="/floral-corner.svg" alt="" class="absolute top-0 right-0 w-48 opacity-50 mix-blend-screen scale-x-[-1]" />
      <img src="/floral-corner.svg" alt="" class="absolute bottom-0 left-0 w-48 opacity-50 mix-blend-screen scale-y-[-1]" />
      <img src="/floral-corner.svg" alt="" class="absolute bottom-0 right-0 w-48 opacity-50 mix-blend-screen rotate-180" />

      <div class="shell relative z-10 flex min-h-[100svh] items-center justify-center py-12">
        <div
          bind:this={root}
          class="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center text-ivory md:py-20"
        >
          <p data-opening-item class="mx-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-softGold/90">
            <Sparkles size={14} class="animate-pulseSoft" />
            The Wedding Of
          </p>
          
          <h1
            data-opening-item
            class="mt-6 font-display text-[3.2rem] leading-[0.95] text-ivory drop-shadow-lg md:mt-8 md:text-[5.5rem]"
          >
            {siteConfig.bride.short}
            <span class="font-script text-5xl md:text-7xl text-gold block my-4 opacity-90 drop-shadow-md">&</span>
            {siteConfig.groom.short}
          </h1>
          
          <p data-opening-item class="mt-6 text-xs uppercase tracking-[0.3em] text-ivory/70 drop-shadow-sm md:mt-8 md:text-sm">
            {siteConfig.subtitle}
          </p>

          <div data-opening-item class="relative mx-auto mt-10 md:mt-14 max-w-sm">
            <!-- Decorative Javanese Box for Guest Name -->
            <div class="absolute inset-0 bg-bark/40 backdrop-blur-md rounded-xl border border-gold/30"></div>
            <div class="absolute inset-1 border border-gold/15 rounded-lg pointer-events-none"></div>
            <div class="relative px-6 py-6">
              <p class="text-[0.65rem] uppercase tracking-[0.35em] text-gold/70">Kepada Yth.</p>
              <p class="mt-4 font-display text-3xl leading-tight text-ivory" aria-label={currentName}>
                {#each guestWords as word}
                  <span class="inline-block overflow-hidden">
                    <span class="guest-word inline-block drop-shadow-md">{word}&nbsp;</span>
                  </span>
                {/each}
              </p>
            </div>
          </div>
          
          <!-- Scroll Indicator -->
          <div
            data-opening-item
            class="mt-12 flex flex-col items-center gap-3 opacity-60 md:mt-16"
          >
            <span class="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
            <div class="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Holy Verse Section -->
    <section class="shell relative z-10 py-24 md:py-36 text-center">
      <div class="absolute inset-0 opacity-[0.03] bg-batik-overlay z-0"></div>
      <div data-reveal class="max-w-3xl mx-auto px-6 relative z-10">
        <div class="premium-divider"></div>
        <p class="text-deepCocoa/70 text-lg md:text-xl leading-[2] text-verse italic drop-shadow-sm">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
        <p class="mt-8 text-deepGold font-semibold uppercase tracking-[0.3em] text-xs">
          Q.S Ar-Rum : 21
        </p>
        <div class="premium-divider rotate-180"></div>
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
    <RSVPSection defaultName={currentName !== 'Bapak/Ibu/Saudara/i' ? currentName : ''} />
    
    <!-- Footer -->
    <footer class="bg-bark text-ivory relative overflow-hidden py-16 text-center">
      <img src="/wayang-silhouette.svg" alt="" class="absolute bottom-0 left-4 w-32 opacity-10 pointer-events-none" />
      <img src="/wayang-silhouette.svg" alt="" class="absolute bottom-0 right-4 w-32 opacity-10 pointer-events-none scale-x-[-1]" />
      
      <div class="relative z-10 shell">
        <h2 class="font-display text-4xl mb-6">{siteConfig.bride.short} <span class="text-gold">&</span> {siteConfig.groom.short}</h2>
        <p class="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/40">
          Created with love • {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  </main>
</div>
