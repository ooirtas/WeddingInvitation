<script>
  import SectionHeading from './SectionHeading.svelte';
  import { Instagram } from 'lucide-svelte';

  export let bride;
  export let groom;
</script>

<section class="invitation-section bg-ivory relative overflow-hidden" id="couple">
  <!-- Decorative background -->
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.05),transparent_60%)]"></div>
  <img src="/batik-kawung.svg" alt="" class="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none object-cover" />
  
  <!-- Corner Ornaments -->
  <img src="/floral-corner.svg" alt="" class="ornament-corner top-0 left-0" />
  <img src="/floral-corner.svg" alt="" class="ornament-corner top-0 right-0 scale-x-[-1]" />
  <img src="/floral-corner.svg" alt="" class="ornament-corner bottom-0 left-0 scale-y-[-1]" />
  <img src="/floral-corner.svg" alt="" class="ornament-corner bottom-0 right-0 rotate-180" />

  <div class="relative z-10">
    <SectionHeading 
      tag="Mempelai" 
      title="Dua Jiwa, Satu Janji Suci" 
      description="Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:"
    />

    <div class="mt-20 grid gap-16 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 lg:gap-12 relative">
      <!-- Bride -->
      <div class="group flex flex-col items-center text-center" data-reveal>
        <div class="relative mb-8 w-64 h-80 sm:w-72 sm:h-96 shrink-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <div class="glass-card image-frame absolute inset-0 overflow-hidden shadow-elevated">
            <enhanced:img 
              src={bride.image} 
              alt={bride.full} 
              class="h-full w-full object-cover object-center transition-transform duration-1000 ease-in-out group-hover:scale-110 sepia-[0.2]" 
            />
          </div>
          <!-- Decorative leaf accent -->
          <img src="/floral-corner.svg" alt="" class="absolute -bottom-6 -left-6 w-24 h-24 opacity-60 rotate-[-15deg] z-10 pointer-events-none" />
        </div>
        
        <h3 class="font-display text-3xl sm:text-4xl font-medium text-bark drop-shadow-sm">{bride.full}</h3>
        <p class="mt-4 text-[0.8rem] uppercase tracking-[0.25em] text-deepGold/80 font-medium">Putri dari</p>
        <p class="mt-2 text-deepCocoa/70 font-light text-balance">{bride.parents}</p>
      </div>

      <!-- Divider -->
      <div class="flex flex-col items-center gap-8 py-8 md:py-0" data-reveal>
        <div class="h-24 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent md:h-40"></div>
        <div class="font-script text-6xl md:text-8xl text-gold drop-shadow-md">&</div>
        <div class="h-24 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent md:h-40"></div>
      </div>

      <!-- Groom -->
      <div class="group flex flex-col items-center text-center" data-reveal>
        <div class="relative mb-8 w-64 h-80 sm:w-72 sm:h-96 shrink-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <div class="glass-card image-frame absolute inset-0 overflow-hidden shadow-elevated">
            <enhanced:img 
              src={groom.image} 
              alt={groom.full} 
              class="h-full w-full object-cover object-center transition-transform duration-1000 ease-in-out group-hover:scale-110 sepia-[0.2]" 
            />
          </div>
          <!-- Decorative leaf accent -->
          <img src="/floral-corner.svg" alt="" class="absolute -bottom-6 -right-6 w-24 h-24 opacity-60 rotate-[105deg] z-10 pointer-events-none" />
        </div>
        
        <h3 class="font-display text-3xl sm:text-4xl font-medium text-bark drop-shadow-sm">{groom.full}</h3>
        <p class="mt-4 text-[0.8rem] uppercase tracking-[0.25em] text-deepGold/80 font-medium">Putra dari</p>
        <p class="mt-2 text-deepCocoa/70 font-light text-balance">{groom.parents}</p>
      </div>
    </div>
  </div>
</section>
