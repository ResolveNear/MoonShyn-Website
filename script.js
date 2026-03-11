/* ============================================
   MoonShyn — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Nav Scroll Effect ---
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll Fade-In Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    fadeObserver.observe(el);
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all siblings
      item.parentElement.querySelectorAll('.accordion-item').forEach(sibling => {
        sibling.classList.remove('active');
        const siblingBody = sibling.querySelector('.accordion-body');
        if (siblingBody) siblingBody.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- Size Selector ---
  document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      this.parentElement.querySelectorAll('.size-option').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Color Swatch Selector ---
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // --- Product Image Gallery (PDP) ---
  const mainImage = document.querySelector('.pdp-main-image img');
  const thumbs = document.querySelectorAll('.pdp-thumb');

  if (mainImage && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.querySelector('img').src;
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
        }, 200);
      });
    });

    // Image zoom on hover
    const mainImageContainer = document.querySelector('.pdp-main-image');
    if (mainImageContainer) {
      mainImageContainer.addEventListener('mousemove', (e) => {
        const rect = mainImageContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        mainImage.style.transform = 'scale(1.5)';
      });
      mainImageContainer.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1)';
      });
    }
  }

  // --- Modal (Size Guide) ---
  const sizeGuideBtn = document.querySelector('.size-guide-trigger');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');

  if (sizeGuideBtn && modalOverlay) {
    sizeGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Filter Sidebar Toggle (Mobile) ---
  const filterToggle = document.querySelector('.filter-toggle');
  const filtersSidebar = document.querySelector('.filters-sidebar');

  if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener('click', () => {
      filtersSidebar.classList.toggle('active');
    });
  }

  // Filter option toggle
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('active');
    });
  });

  // --- Quantity Selector (PDP) ---
  const qtyMinus = document.querySelector('.qty-minus');
  const qtyPlus = document.querySelector('.qty-plus');
  const qtyValue = document.querySelector('.qty-value');

  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyValue.textContent);
      if (val > 1) qtyValue.textContent = val - 1;
    });
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyValue.textContent);
      qtyValue.textContent = val + 1;
    });
  }

  // --- Contact Form ---
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      btn.textContent = 'Sent! ✨';
      btn.style.background = 'var(--color-success)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

});

// --- Carousel Controls (global) ---
function carouselNext(id) {
  const track = document.getElementById(id);
  if (!track) return;
  const cardWidth = track.querySelector('.product-card').offsetWidth + 24;
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
  const current = track.scrollLeft || 0;
  const next = Math.min(current + cardWidth, maxScroll);

  track.style.transition = 'none';
  if (!track._scrollEnabled) {
    track.style.overflow = 'hidden';
    track.style.scrollBehavior = 'smooth';
    track._scrollEnabled = true;
    // Convert transform-based to scroll-based
    track.style.display = 'flex';
    track.style.overflowX = 'auto';
    track.style.scrollSnapType = 'x mandatory';
    track.style.msOverflowStyle = 'none';
    track.style.scrollbarWidth = 'none';
  }
  track.scrollTo({ left: next, behavior: 'smooth' });
}

function carouselPrev(id) {
  const track = document.getElementById(id);
  if (!track) return;
  const cardWidth = track.querySelector('.product-card').offsetWidth + 24;
  const current = track.scrollLeft || 0;
  const prev = Math.max(current - cardWidth, 0);

  if (!track._scrollEnabled) {
    track.style.overflow = 'hidden';
    track.style.scrollBehavior = 'smooth';
    track._scrollEnabled = true;
    track.style.display = 'flex';
    track.style.overflowX = 'auto';
    track.style.scrollSnapType = 'x mandatory';
    track.style.msOverflowStyle = 'none';
    track.style.scrollbarWidth = 'none';
  }
  track.scrollTo({ left: prev, behavior: 'smooth' });
}

// --- Touch Swipe for Carousel ---
document.querySelectorAll('.carousel-track').forEach(track => {
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollStart = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const diff = startX - e.touches[0].pageX;
    track.scrollLeft = scrollStart + diff;
  }, { passive: true });
});
