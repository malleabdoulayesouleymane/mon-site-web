/* ============================================================
   LYCÉE MADINA — Main Script (ES6)
   ============================================================ */

'use strict';

/* --- Preloader --- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600);
  }
});

/* --- Floating Particles --- */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = Math.random() * 15 + 10 + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.opacity = Math.random() * 0.5 + 0.1;
    container.appendChild(p);
  }
})();

/* --- Navbar Scroll Effect --- */
(function initNavbarScroll() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* --- Active Nav Link on Scroll --- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-madina .nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* --- Counter Animation --- */
(function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const bars = document.querySelectorAll('.stat-bar-fill[data-width]');
  let animated = false;

  const animate = () => {
    if (animated) return;
    animated = true;

    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.textContent.includes('+') ? '+' : '%';
      let current = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + suffix;
      }, 25);
    });

    bars.forEach(bar => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 300);
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('apropos');
  if (statsSection) observer.observe(statsSection);
})();

/* --- Scroll Fade-in Animations --- */
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* --- Scroll to Top Button --- */
(function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* --- Gallery Lightbox --- */
(function initLightbox() {
  const items = document.querySelectorAll('.gallery-item, .internat-masonry-item');
  const lightboxImage = document.getElementById('lightboxImage');
  if (!lightboxImage) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
      }
    });
  });
})();

/* --- Contact Form Validation --- */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    let valid = true;

    [name, email, message].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        valid = false;
      } else {
        field.style.borderColor = '#e0e0e0';
      }
    });

    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#e74c3c';
      valid = false;
    }

    // Animation du bouton CTA
    const ctaBtn = document.querySelector('.btn-pulse');
    if (ctaBtn) {
      // Si on veut ajouter des choses plus tard
    }

    if (valid) {
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Envoyé ✓';
      btn.style.background = '#27ae60';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    }
  });

  /* Focus-visible turquoise highlight */
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#008B8B';
    });
    input.addEventListener('blur', () => {
      if (!input.value.trim() && input.hasAttribute('required')) {
        input.style.borderColor = '#e0e0e0';
      }
    });
  });
})();

/* --- Newsletter Form --- */
(function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput && emailInput.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      const btn = form.querySelector('.btn-newsletter');
      btn.textContent = 'Envoyé ✓';
      btn.style.background = '#27ae60';
      emailInput.value = '';
      setTimeout(() => {
        btn.textContent = 'Send';
        btn.style.background = '';
      }, 3000);
    }
  });
})();

/* --- Close mobile nav on link click --- */
(function initMobileNavClose() {
  const navLinks = document.querySelectorAll('.navbar-madina .nav-link');
  const navCollapse = document.getElementById('navbarNav');
  if (!navCollapse) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();

/* --- GSAP Animations (Interactions complexes) --- */
(function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Animation d'apparition successive (stagger) pour la galerie de l'internat
  const internatItems = document.querySelectorAll('.internat-masonry-item');
  if (internatItems.length > 0) {
    gsap.to(internatItems, {
      scrollTrigger: {
        trigger: '#internatMasonry',
        start: 'top 85%', // se déclenche quand le conteneur arrive à 85% de la hauteur de la fenêtre
      },
      y: 0,
      opacity: 1,
      filter: 'blur(0px)', // Retire le flou progressivement (Blur-in)
      duration: 0.8,
      stagger: 0.15, // Délai entre chaque animation d'élément
      ease: 'power3.out'
    });
  }
})();

/* --- Immersive Horizontal Gallery --- */
(function initImmersiveGallery() {
  const trigger = document.getElementById('btnImmersiveGallery');
  const overlay = document.getElementById('immersiveGalleryOverlay');
  const closeBtn = document.getElementById('immersiveCloseBtn');
  const scroller = document.getElementById('immersiveScroller');
  let autoScrollTimer = null;

  if (!trigger || !overlay || !closeBtn || !scroller) return;

  const startAutoScroll = () => {
    if (autoScrollTimer) return;
    autoScrollTimer = setInterval(() => {
      const items = scroller.querySelectorAll('.immersive-item');
      if (items.length === 0) return;

      const itemWidth = items[0].offsetWidth;
      const gap = parseFloat(window.getComputedStyle(scroller).gap) || 0;
      const scrollStep = itemWidth + gap;

      if (scroller.scrollLeft + scroller.offsetWidth >= scroller.scrollWidth - 10) {
        // Retour au début si on est à la fin
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Défilement vers la droite
        scroller.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 3500);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  };

  const openGallery = () => {
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden'; 
    scroller.scrollLeft = 0;
    startAutoScroll();
  };

  const closeGallery = () => {
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    stopAutoScroll();
  };

  trigger.addEventListener('click', openGallery);
  closeBtn.addEventListener('click', closeGallery);

  // Keyboard navigation & accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeGallery();
      trigger.focus(); 
    }
  });

  // Close when clicking directly on the blurred background
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.id === 'immersiveScroller') {
      closeGallery();
    }
  });
})();

/* ============================================================
   PAGE DIRECTION & EXCELLENCE - GSAP ANIMATIONS
   ============================================================ */
(function initDirectionPage() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  const dirPage = document.querySelector('.direction-page');
  if (!dirPage) return;

  // Enlever la classe opacity-0 initialement mise en css, et animer l'entrée
  gsap.to(".direction-page", {
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    onStart: () => {
      dirPage.style.visibility = 'visible';
    }
  });

  // Staggered Entrance pour les cartes Leadership (Blur-to-Focus)
  gsap.fromTo(".stagger-card", 
    { 
      y: 60, 
      opacity: 0, 
      filter: "blur(15px)" 
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.2, // délai de 0.2s
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".leadership-section",
        start: "top 85%",
      }
    }
  );

  // Apparition du texte descriptif en scroll
  gsap.utils.toArray(".scroll-typo-reveal").forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    });
  });

  // Gestion du retour (fade out page avant de partir)
  const backBtn = document.querySelector('.page-transition-btn');
  if(backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = backBtn.getAttribute('href');
      gsap.to(".direction-page", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          window.location.href = target;
        }
      });
    });
  }
})();

/**
 * INIT INTERNAT AUTO-SCROLL (Slider Horizontal Infini vers la Droite)
 */
(function initInternatCarousel() {
  const container = document.getElementById('internatMasonry');
  if (!container) return;

  function moveNext() {
    const items = container.querySelectorAll('.internat-masonry-item');
    if (items.length < 2) return;

    const lastItem = items[items.length - 1];
    const itemWidth = lastItem.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
    const totalMove = itemWidth + gap;

    // 1. On déplace le dernier élement au début de la liste
    container.prepend(lastItem);

    // 2. On décale immédiatement le conteneur à gauche pour compenser visuellement le prepend
    gsap.set(container, { x: -totalMove });

    // 3. On anime le retour à 0 pour créer l'effet de glissement vers la droite
    gsap.to(container, {
      x: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Optionnel : on pourrait relancer ici ou via un intervalle
      }
    });
  }

  // Lancement automatique toutes les 4 secondes
  setInterval(moveNext, 4000);
})();

/**
 * INIT NEWS SCROLLER ANIMATIONS
 */
(function initNewsScroller() {
  const newsScroller = document.getElementById('newsScroller');
  if (!newsScroller) return;

  const newsCards = newsScroller.querySelectorAll('.news-card');
  
  // S'assurer que les cartes sont visibles immédiatement
  gsap.set(newsCards, { opacity: 1, x: 0 });

  // Animation d'entrée plus légère
  gsap.from(newsCards, {
    scrollTrigger: {
      trigger: "#actualites",
      start: "top 85%",
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
  });

  // LOGIQUE AUTO-SCROLL UN À UN
  let isScrolling = false;
  function scrollNext() {
    if (isScrolling) return;
    isScrolling = true;

    const cards = newsScroller.querySelectorAll('.news-card');
    if (cards.length < 2) return;

    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(newsScroller).gap) || 0;
    const moveAmount = cardWidth + gap;

    // Animation de défilement vers la gauche (l'élément suivant arrive)
    gsap.to(newsScroller, {
      scrollLeft: newsScroller.scrollLeft + moveAmount,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        newsScroller.appendChild(firstCard);
        newsScroller.scrollLeft -= moveAmount; // Reset instantané sans flash
        isScrolling = false;
      }
    });
  }

  // Lancement de l'intervalle de 2 secondes
  let newsInterval = setInterval(scrollNext, 2000);

  // Pause au survol pour la lecture
  newsScroller.addEventListener('mouseenter', () => clearInterval(newsInterval));
  newsScroller.addEventListener('mouseleave', () => newsInterval = setInterval(scrollNext, 2000));
})();
