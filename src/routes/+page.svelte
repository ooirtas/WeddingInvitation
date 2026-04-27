<script>
  import { onMount, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import Hero from '$lib/components/Hero.svelte';
  import LoadingScreen from '$lib/components/LoadingScreen.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import MusicPlayer from '$lib/components/MusicPlayer.svelte';
  import CoupleSection from '$lib/components/CoupleSection.svelte';
  import CountdownSection from '$lib/components/CountdownSection.svelte';
  import EventDetails from '$lib/components/EventDetails.svelte';
  import LoveStoryTimeline from '$lib/components/LoveStoryTimeline.svelte';
  import GallerySection from '$lib/components/GallerySection.svelte';
  import RSVPSection from '$lib/components/RSVPSection.svelte';
  import WishesSection from '$lib/components/WishesSection.svelte';
  import { initialWishes, musicSrc } from '$lib/data/invitation';
  import { readStorage, themeKey, wishesKey, writeStorage } from '$lib/utils/storage';
  import { parallax, revealOnView } from '$lib/utils/motion';

  export let data;

  let opened = false;
  let isLoading = true;
  let playing = false;
  let darkMode = false;
  let wishes = [...initialWishes];
  let audio;
  let pageRoot;

  function formatNow() {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());
  }

  async function openInvitation() {
    opened = true;
    await tick();
    document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' });
    if (!playing) {
      await toggleMusic();
    }
  }

  async function toggleMusic() {
    if (!audio) {
      return;
    }

    if (playing) {
      audio.pause();
      playing = false;
      return;
    }

    try {
      await audio.play();
      playing = true;
    } catch {
      playing = false;
    }
  }

  function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
    writeStorage(themeKey, darkMode);
  }

  function handleRSVP(event) {
    wishes = [
      ...wishes,
      {
        ...event.detail,
        timestamp: formatNow()
      }
    ];
    writeStorage(wishesKey, wishes);
  }

  onMount(() => {
    const savedTheme = readStorage(themeKey, false);
    darkMode = Boolean(savedTheme);
    document.body.classList.toggle('dark', darkMode);

    wishes = readStorage(wishesKey, initialWishes);

    const stopReveal = revealOnView('[data-reveal]');
    const stopParallax = pageRoot ? parallax(pageRoot, document.body, 70) : () => {};

    const timer = setTimeout(() => {
      isLoading = false;
      // Mencoba autoplay setelah loading selesai
      // (Mungkin tetap diblokir browser sampai ada klik pertama)
      toggleMusic().catch(() => {
        console.log("Autoplay blocked by browser. Waiting for interaction.");
      });
    }, 1200);

    return () => {
      clearTimeout(timer);
      stopReveal?.();
      stopParallax?.();
    };
  });
</script>

<svelte:head>
  <title>Aruna & Bima | Wedding Invitation</title>
</svelte:head>

<LoadingScreen visible={isLoading} />

<ThemeToggle {darkMode} onToggle={toggleTheme} />
<MusicPlayer {playing} onToggle={toggleMusic} />

<div
  bind:this={pageRoot}
  class="relative overflow-x-hidden transition duration-700"
>
  <Hero guestName={data.guestName} {opened} on:open={openInvitation} />

  <main
    class="transition-all duration-700"
    class:pointer-events-none={!opened}
    class:translate-y-10={!opened}
    class:opacity-40={!opened}
    class:blur-md={!opened}
  >
    <div data-reveal><CoupleSection /></div>
    <div data-reveal><CountdownSection /></div>
    <div data-reveal><EventDetails /></div>
    <div data-reveal><LoveStoryTimeline /></div>
    <div data-reveal><GallerySection /></div>
    <div data-reveal><RSVPSection defaultName={data.guestName !== 'Honored Guest' ? data.guestName : ''} on:submit={handleRSVP} /></div>
    <div data-reveal><WishesSection {wishes} /></div>
  </main>
</div>

<audio bind:this={audio} preload="auto" autoplay loop src={musicSrc}></audio>
