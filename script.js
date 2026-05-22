const weddingDate = new Date("2027-02-14T08:00:00+07:00");
const storageKey = "javaneseWeddingWishes";
const defaultWishes = [
  {
    name: "Nadya",
    attendance: "Attending",
    message: "Wishing you both a marriage filled with gentle joy, laughter, and endless blessings.",
    timestamp: "Just now"
  },
  {
    name: "Rizky",
    attendance: "Maybe",
    message: "May your new chapter be surrounded by warmth, patience, and beautiful memories.",
    timestamp: "Today"
  }
];

const state = {
  currentSlide: 0,
  wishes: []
};

const elements = {
  loader: document.getElementById("loader"),
  openInvitation: document.getElementById("openInvitation"),
  mainContent: document.getElementById("mainContent"),
  countdown: {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  },
  galleryTrack: document.getElementById("galleryTrack"),
  slides: Array.from(document.querySelectorAll(".gallery-slide")),
  thumbs: Array.from(document.querySelectorAll(".thumb")),
  prevSlide: document.getElementById("prevSlide"),
  nextSlide: document.getElementById("nextSlide"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  closeLightbox: document.getElementById("closeLightbox"),
  wishesList: document.getElementById("wishesList"),
  rsvpForm: document.getElementById("rsvpForm"),
  formStatus: document.getElementById("formStatus"),
  backgroundMusic: document.getElementById("backgroundMusic"),
  musicToggle: document.getElementById("musicToggle"),
  guestName: document.getElementById("guestName"),
  menuToggle: document.getElementById("menuToggle"),
  navLinks: document.getElementById("navLinks")
};

function init() {
  hydrateGuestName();
  hydrateWishes();
  renderWishes();
  updateCountdown();
  initRevealAnimations();
  initGallery();
  initForm();
  initMusic();
  initNavigation();
  window.setInterval(updateCountdown, 1000);
  window.addEventListener("load", hideLoader, { once: true });
}

function hideLoader() {
  window.setTimeout(() => {
    elements.loader.classList.add("is-hidden");
  }, 900);
}

function hydrateGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to") || params.get("guest") || "Honored Guest";
  elements.guestName.textContent = sanitizeText(guest);
  const nameField = document.getElementById("name");
  if (nameField && guest !== "Honored Guest") {
    nameField.value = sanitizeText(guest);
  }
}



function hydrateWishes() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    state.wishes = defaultWishes;
    localStorage.setItem(storageKey, JSON.stringify(defaultWishes));
    return;
  }

  try {
    state.wishes = JSON.parse(saved);
  } catch {
    state.wishes = defaultWishes;
  }
}

function persistWishes() {
  localStorage.setItem(storageKey, JSON.stringify(state.wishes));
}

function renderWishes() {
  if (!state.wishes.length) {
    elements.wishesList.innerHTML = "<p>No wishes yet. Be the first to send some love.</p>";
    return;
  }

  elements.wishesList.innerHTML = state.wishes
    .slice()
    .reverse()
    .map(
      (wish) => `
        <article class="wish-item">
          <div class="wish-item__meta">
            <h4>${escapeHtml(wish.name)}</h4>
            <span>${escapeHtml(wish.attendance)}</span>
          </div>
          <p>${escapeHtml(wish.message)}</p>
          <div class="wish-item__meta">
            <span>${escapeHtml(wish.timestamp)}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    setCountdownValues(0, 0, 0, 0);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setCountdownValues(days, hours, minutes, seconds);
}

function setCountdownValues(days, hours, minutes, seconds) {
  elements.countdown.days.textContent = String(days).padStart(2, "0");
  elements.countdown.hours.textContent = String(hours).padStart(2, "0");
  elements.countdown.minutes.textContent = String(minutes).padStart(2, "0");
  elements.countdown.seconds.textContent = String(seconds).padStart(2, "0");
}

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function initGallery() {
  updateGallery();

  elements.prevSlide.addEventListener("click", () => {
    state.currentSlide = (state.currentSlide - 1 + elements.slides.length) % elements.slides.length;
    updateGallery();
  });

  elements.nextSlide.addEventListener("click", () => {
    state.currentSlide = (state.currentSlide + 1) % elements.slides.length;
    updateGallery();
  });

  elements.thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      state.currentSlide = Number(thumb.dataset.slide);
      updateGallery();
    });
  });

  elements.slides.forEach((slide) => {
    const image = slide.querySelector("img");
    image.addEventListener("click", () => openLightbox(image.src, image.alt));
  });

  elements.closeLightbox.addEventListener("click", closeLightbox);
  elements.lightbox.addEventListener("click", (event) => {
    if (event.target === elements.lightbox) {
      closeLightbox();
    }
  });
}

function updateGallery() {
  elements.galleryTrack.style.transform = `translateX(-${state.currentSlide * 100}%)`;
  elements.galleryTrack.style.transition = "transform 420ms ease";

  elements.slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === state.currentSlide);
  });

  elements.thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("is-active", index === state.currentSlide);
  });
}

function openLightbox(src, alt) {
  elements.lightbox.hidden = false;
  elements.lightboxImage.src = src;
  elements.lightboxImage.alt = alt;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  elements.lightbox.hidden = true;
  elements.lightboxImage.src = "";
  document.body.style.overflow = "";
}

function initForm() {
  elements.rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(elements.rsvpForm);
    const name = sanitizeText(formData.get("name"));
    const attendance = sanitizeText(formData.get("attendance"));
    const message = sanitizeText(formData.get("message"));

    if (!name || !attendance || !message) {
      elements.formStatus.textContent = "Please complete all fields before sending your RSVP.";
      return;
    }

    if (message.length < 8) {
      elements.formStatus.textContent = "Please write a slightly longer message so we can treasure it.";
      return;
    }

    state.wishes.push({
      name,
      attendance,
      message,
      timestamp: new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(new Date())
    });

    persistWishes();
    renderWishes();
    elements.rsvpForm.reset();
    elements.formStatus.textContent = "Thank you for your RSVP and kind wishes.";
  });
}

function initMusic() {
  let isPlaying = false;

  elements.musicToggle.addEventListener("click", async () => {
    try {
      if (isPlaying) {
        elements.backgroundMusic.pause();
        isPlaying = false;
        updateMusicUI(isPlaying);
        return;
      }

      await elements.backgroundMusic.play();
      isPlaying = true;
      updateMusicUI(isPlaying);
    } catch {
      elements.formStatus.textContent = "Tap the music button again if your browser blocks autoplay.";
    }
  });
}

function updateMusicUI(isPlaying) {
  elements.musicToggle.setAttribute("aria-pressed", String(isPlaying));
  elements.musicToggle.querySelector(".music-toggle__text").textContent = isPlaying ? "Music On" : "Music Off";
}

function initNavigation() {
  elements.openInvitation.addEventListener("click", async () => {
    elements.mainContent.classList.remove("is-locked");
    document.querySelector("#couple").scrollIntoView({ behavior: "smooth" });

    try {
      await elements.backgroundMusic.play();
      updateMusicUI(true);
    } catch {
      updateMusicUI(false);
    }
  });

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.navLinks.classList.toggle("is-open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  elements.navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      elements.navLinks.classList.remove("is-open");
      elements.menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function sanitizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

init();
