<script>
  import SectionHeading from './SectionHeading.svelte';
  import WishesSection from './WishesSection.svelte';
  import { Send, Heart, User, Users } from 'lucide-svelte';
  import { submitRsvp } from '$lib/utils/rsvp';

  export let defaultName = '';

  let name = defaultName;
  let status = 'hadir';
  let pax = 1;
  let message = '';
  
  let isSubmitting = false;
  let submitStatus = null; // 'success' | 'error' | null

  async function handleSubmit() {
    isSubmitting = true;
    submitStatus = null;
    
    try {
      await submitRsvp({ name, status, pax, message });
      submitStatus = 'success';
      if (status === 'hadir' || status === 'ragu') {
        message = ''; // Clear message on success
      }
    } catch (error) {
      console.error('Failed to submit RSVP:', error);
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section class="invitation-section bg-warmBeige relative" id="rsvp">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08),transparent_70%)]"></div>
  
  <div class="relative z-10">
    <SectionHeading 
      tag="Kehadiran" 
      title="RSVP & Ucapan" 
      description="Silahkan konfirmasi kehadiran dan berikan doa restu Anda."
    />

    <div class="mt-16 grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
      <!-- RSVP Form -->
      <div class="glass-card p-8 sm:p-12 h-fit bg-white/70" data-reveal>
        <h3 class="font-display text-2xl md:text-3xl font-medium text-bark mb-8 flex items-center gap-3">
          <Heart size={24} class="text-gold" />
          Konfirmasi Kehadiran
        </h3>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium uppercase tracking-widest text-deepCocoa/70">
              Nama Lengkap
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/60">
                <User size={18} />
              </div>
              <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="w-full rounded-xl border border-gold/30 bg-white/50 py-3.5 pl-12 pr-4 text-bark placeholder:text-deepCocoa/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="Tulis nama Anda"
              />
            </div>
          </div>

          <div class="space-y-2">
            <span class="block text-sm font-medium uppercase tracking-widest text-deepCocoa/70">
              Kehadiran
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {#each [
                { id: 'hadir', label: 'Hadir' },
                { id: 'ragu', label: 'Masih Ragu' },
                { id: 'tidak_hadir', label: 'Tidak Hadir' }
              ] as option}
                <label class="relative flex cursor-pointer items-center justify-center rounded-xl border p-4 text-center transition-all {status === option.id ? 'border-gold bg-gold/10 text-deepGold shadow-sm' : 'border-gold/20 bg-white/40 text-deepCocoa/60 hover:border-gold/40 hover:bg-white/60'}">
                  <input
                    type="radio"
                    name="status"
                    value={option.id}
                    bind:group={status}
                    class="sr-only"
                  />
                  <span class="text-sm font-medium">{option.label}</span>
                  
                  {#if status === option.id}
                    <div class="absolute -top-2 -right-2 bg-gold text-white rounded-full p-1 shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-3 h-3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  {/if}
                </label>
              {/each}
            </div>
          </div>

          {#if status !== 'tidak_hadir'}
            <div class="space-y-2" transition:fade>
              <label for="pax" class="block text-sm font-medium uppercase tracking-widest text-deepCocoa/70">
                Jumlah Hadir
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/60">
                  <Users size={18} />
                </div>
                <select
                  id="pax"
                  bind:value={pax}
                  class="w-full appearance-none rounded-xl border border-gold/30 bg-white/50 py-3.5 pl-12 pr-10 text-bark focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gold/60">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          {/if}

          <div class="space-y-2">
            <label for="message" class="block text-sm font-medium uppercase tracking-widest text-deepCocoa/70">
              Ucapan & Doa
            </label>
            <textarea
              id="message"
              bind:value={message}
              rows="4"
              required
              class="w-full rounded-xl border border-gold/30 bg-white/50 p-4 text-bark placeholder:text-deepCocoa/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all resize-none"
              placeholder="Tulis ucapan dan doa restu untuk mempelai..."
            ></textarea>
          </div>

          {#if submitStatus === 'success'}
            <div class="rounded-xl bg-green-50/80 border border-green-200 p-4 text-sm text-green-800 flex gap-3 items-start backdrop-blur-sm" transition:fade>
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <p>Terima kasih atas konfirmasi dan doa restu yang diberikan.</p>
            </div>
          {/if}

          {#if submitStatus === 'error'}
            <div class="rounded-xl bg-red-50/80 border border-red-200 p-4 text-sm text-red-800 backdrop-blur-sm" transition:fade>
              Terjadi kesalahan. Silahkan coba beberapa saat lagi.
            </div>
          {/if}

          <button
            type="submit"
            disabled={isSubmitting}
            class="gold-button w-full shadow-lg"
          >
            {#if isSubmitting}
              <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
              Mengirim...
            {:else}
              <Send size={18} />
              Kirim Konfirmasi
            {/if}
          </button>
        </form>
      </div>

      <!-- Wishes Stream -->
      <div data-reveal>
        <WishesSection />
      </div>
    </div>
  </div>
</section>
