<script>
  import { onMount, onDestroy } from 'svelte';
  import { Volume2, VolumeX, Music } from 'lucide-svelte';
  import { musicState } from '$lib/stores/music';

  export let src;

  let audio;
  let showLabel = true;
  let hasPendingAutoplay = false;
  let userInteracted = false;

  function canUseWindow() {
    return typeof window !== 'undefined';
  }

  // ─── Intercept interaksi pertama pengguna ───────────────────────────────────
  // Browser hanya mengizinkan autoplay setelah ada gesture dari pengguna.
  // Kita pasang listener di window, lalu langsung mainkan musik jika pending.
  function handleFirstInteraction() {
    if (userInteracted) return;
    userInteracted = true;

    removeInteractionListeners();

    if (hasPendingAutoplay) {
      void startPlayback();
    }
  }

  const interactionEvents = ['click', 'touchstart', 'keydown', 'scroll'];

  function addInteractionListeners() {
    if (!canUseWindow()) return;

    interactionEvents.forEach((event) =>
      window.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    );
  }

  function removeInteractionListeners() {
    if (!canUseWindow()) return;

    interactionEvents.forEach((event) =>
      window.removeEventListener(event, handleFirstInteraction)
    );
  }
  // ───────────────────────────────────────────────────────────────────────────

  async function startPlayback() {
    if (!audio) return false;

    try {
      // Pastikan tidak muted sebelum play
      audio.muted = false;
      await audio.play();

      hasPendingAutoplay = false;
      musicState.setPlaying(true);

      setTimeout(() => {
        showLabel = false;
      }, 3000);

      return true;
    } catch (error) {
      // AutoPlay Policy Error → tandai pending, tunggu interaksi
      hasPendingAutoplay = true;
      musicState.setPlaying(false);

      // Pasang listener interaksi jika belum ada
      if (!userInteracted) {
        addInteractionListeners();
      }

      console.warn('Autoplay blocked, waiting for user interaction...', error);
      return false;
    }
  }

  export async function play() {
    return startPlayback();
  }

  async function toggle() {
    if ($musicState.playing) {
      audio?.pause();
      musicState.setPlaying(false);
    } else {
      userInteracted = true; // tombol diklik = interaksi valid
      removeInteractionListeners();
      await startPlayback();
    }
  }

  onMount(() => {
    audio.addEventListener('pause', () => musicState.setPlaying(false));
    audio.addEventListener('play', () => musicState.setPlaying(true));

    // canplay: coba lagi jika audio sudah siap & ada pending autoplay
    audio.addEventListener('canplay', () => {
      if (hasPendingAutoplay && userInteracted) {
        void startPlayback();
      }
    });

    // Langsung coba autoplay saat mount
    void startPlayback();
  });

  onDestroy(() => {
    removeInteractionListeners();
  });
</script>

<audio bind:this={audio} {src} loop preload="auto"></audio>

<div class="fixed bottom-6 right-6 z-[90] flex items-center gap-4">
  {#if showLabel}
    <div
      class="hidden sm:flex items-center gap-2 rounded-full bg-bark/80 backdrop-blur-md px-4 py-2 border border-gold/30 text-ivory text-xs uppercase tracking-widest shadow-luxury animate-fadeUpSlow"
    >
      <Music size={14} class="text-gold" />
      Lagu Dimainkan
    </div>
  {/if}

  <button
    on:click={toggle}
    class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-bark/90 border border-gold/40 text-ivory shadow-[0_10px_25px_rgba(42,31,26,0.4)] backdrop-blur-md transition-all hover:scale-110 hover:bg-bark hover:border-gold z-10"
    aria-label={$musicState.playing ? "Pause music" : "Play music"}
  >
    {#if $musicState.playing}
      <div
        class="absolute -inset-1 rounded-full border border-gold/30 border-t-gold/80 animate-slowSpin pointer-events-none"
      ></div>
    {/if}

    {#if $musicState.playing}
      <Volume2 size={24} class="text-gold transition-transform group-hover:scale-110" />
    {:else}
      <VolumeX size={24} class="text-ivory/70 transition-transform group-hover:scale-110" />
    {/if}
  </button>
</div>
