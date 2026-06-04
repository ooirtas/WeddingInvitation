<script>
  import { onMount, onDestroy } from 'svelte';
  import { Volume2, VolumeX, Music } from 'lucide-svelte';
  import { musicState } from '$lib/stores/music';

  export let src;

  let audio;
  let showLabel = true;
  let hasPendingAutoplay = false;
  let userInteracted = false;
  // true bila sistem (bukan user) yang minta pause → audio harus resume otomatis
  let shouldResume = false;

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
      userInteracted = true; // play berhasil = browser mengakui user gesture
      removeInteractionListeners();
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
    userInteracted = true; // dipanggil dari klik user (OpeningGate)
    removeInteractionListeners();
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

  // ─── Pause/resume oleh sistem (bukan oleh user) ────────────────────────────

  function pauseBySystem() {
    if (!audio || audio.paused) return;
    shouldResume = true;   // tandai: perlu resume saat kembali
    audio.pause();          // 'pause' event akan ditangkap listener di bawah
  }

  function resumeBySystem() {
    if (!shouldResume || !userInteracted || !audio || !audio.paused) return;
    shouldResume = false;

    // Panggil audio.play() LANGSUNG (bukan lewat startPlayback / setTimeout)
    // agar tetap dalam trusted-event context. Browser memblokir play()
    // yang dipanggil dari setTimeout karena dianggap bukan user gesture.
    void audio.play().catch((err) => {
      console.warn('[MusicPlayer] Auto-resume blocked:', err);
      // Jika browser memblokir, biarkan saja — user bisa klik tombol manual.
    });
  }

  // Dipanggil saat tab tersembunyi / terlihat kembali
  function handleVisibilityChange() {
    if (!canUseWindow()) return;
    if (document.hidden) {
      pauseBySystem();
    } else {
      // Langsung resume di dalam handler (bukan setTimeout)
      // supaya audio.play() dianggap trusted oleh browser.
      resumeBySystem();
    }
  }

  // Dipanggil saat window kehilangan / mendapatkan fokus (pindah aplikasi)
  // — hanya relevan jika document.hidden tidak berubah (desktop app switching)
  function handleWindowBlur() {
    if (!canUseWindow() || document.hidden) return;
    pauseBySystem();
  }

  function handleWindowFocus() {
    if (!canUseWindow() || document.hidden) return;
    // Delay minimal agar visibilitychange sempat tiba lebih dulu
    // bila keduanya terjadi bersamaan (mencegah double-resume)
    setTimeout(resumeBySystem, 50);
  }
  // ─────────────────────────────────────────────────────────────────────────

onMount(() => {
  // Pastikan audio element benar-benar ada
  if (!audio) return;

  audio.addEventListener('pause', () => {
    // Abaikan event pause dari sistem — musicState tetap true
    // agar tombol menampilkan "playing" & auto-resume dapat berjalan.
    if (shouldResume) return;
    musicState.setPlaying(false);
  });
  
  audio.addEventListener('play', () => musicState.setPlaying(true));

  audio.addEventListener('canplay', () => {
    if (hasPendingAutoplay && userInteracted) {
      void startPlayback();
    }
  });

  // Pasang listener hanya di client
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  if (canUseWindow()) {
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
  }

  void startPlayback();
});

  onDestroy(() => {
    removeInteractionListeners();
    if (canUseWindow()) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    }
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
