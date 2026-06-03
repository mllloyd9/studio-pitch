// ============================================================
// CONFIGURATION — swap in your real Zapier webhook URL
// ============================================================
const WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL';

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNav();
  initSegmentCards();
  initModal();
  initForm();
  initFAQ();
  initStickyMobileCTA();
  initFooterForm();
});

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  elements.forEach(el => {
    const delay = el.dataset.delay;
    if (delay) el.style.setProperty('--anim-delay', delay + 'ms');
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ============================================================
// NAVBAR — transparent → solid on scroll
// ============================================================
function initNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const toggle = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

// ============================================================
// SEGMENT CARDS — store selection and open modal
// ============================================================
let selectedSegment = 'general';

function initSegmentCards() {
  document.querySelectorAll('.segment-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedSegment = card.dataset.segment || 'general';
      openModal(selectedSegment);
    });

    // Keyboard accessibility
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedSegment = card.dataset.segment || 'general';
        openModal(selectedSegment);
      }
    });
  });

  // Generic CTA triggers (nav button, hero button, etc.)
  document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.segment || selectedSegment || 'general');
    });
  });
}

// ============================================================
// MODAL
// ============================================================
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !closeBtn) return;

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

function openModal(segment) {
  const overlay  = document.getElementById('modal-overlay');
  const badge    = document.getElementById('modal-badge');
  const segField = document.getElementById('segment-field');
  const formWrap = document.getElementById('modal-form-wrap');
  const success  = document.getElementById('modal-success');

  if (!overlay) return;

  // Reset to form state
  if (formWrap) formWrap.style.display = '';
  if (success)  success.style.display = 'none';
  const errEl = document.getElementById('form-error');
  if (errEl) errEl.style.display = 'none';
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Claim My Free 30-Day Plan →'; }

  // Set segment
  if (segField) segField.value = segment;

  // Update badge
  if (badge) {
    const labels = {
      'fitness-enthusiast': 'Fitness Enthusiast',
      'stay-at-home-mom':   'Stay-at-Home Mom',
      'general':            'Free Challenge',
    };
    badge.textContent = labels[segment] || 'Free Challenge';
    badge.className = 'modal-segment-badge ' + (segment === 'stay-at-home-mom' ? 'orange' : 'green');
  }

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus first input
  setTimeout(() => {
    const first = document.getElementById('first-name');
    if (first) first.focus();
  }, 320);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ============================================================
// SIGNUP FORM — validate → POST to Zapier → show state
// ============================================================
function initForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const errEl    = document.getElementById('form-error');
    const submitBtn = document.getElementById('submit-btn');

    // Basic validation
    const firstName = formData.get('first_name').trim();
    const email     = formData.get('email').trim();

    if (!firstName) return showFormError(errEl, 'Please enter your first name.');
    if (!email || !isValidEmail(email)) return showFormError(errEl, 'Please enter a valid email address.');

    // Clear errors, set loading state
    if (errEl) errEl.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const payload = {
      first_name:          firstName,
      email:               email,
      goal:                formData.get('goal')               || '',
      fitness_level:       formData.get('fitness_level')      || '',
      dietary_preference:  formData.get('dietary_preference') || '',
      segment:             formData.get('segment')            || 'general',
      source:              'landing-page',
      timestamp:           new Date().toISOString(),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Show success (Zapier returns 200 or CORS — treat any completion as success)
      showModalSuccess();

    } catch {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Claim My Free 30-Day Plan →';
      }
      showFormError(errEl, 'Something went wrong. Please check your connection and try again.');
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(el, message) {
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function showModalSuccess() {
  const formWrap = document.getElementById('modal-form-wrap');
  const success  = document.getElementById('modal-success');
  if (formWrap) formWrap.style.display = 'none';
  if (success)  success.style.display = '';

  // Auto-close after 4 seconds
  setTimeout(closeModal, 4000);
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

// ============================================================
// STICKY MOBILE CTA — show after hero scrolls out of view
// ============================================================
function initStickyMobileCTA() {
  const bar  = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const showing = !entry.isIntersecting;
      bar.classList.toggle('visible', showing);
      bar.setAttribute('aria-hidden', String(!showing));
    },
    { threshold: 0 }
  );

  observer.observe(hero);
}

// ============================================================
// FOOTER EMAIL FORM
// ============================================================
function initFooterForm() {
  const form    = document.getElementById('footer-form');
  const success = document.getElementById('footer-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const emailInput = document.getElementById('footer-email');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email || !isValidEmail(email)) {
      if (emailInput) {
        emailInput.style.borderColor = '#ff5555';
        setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
      }
      return;
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          segment: 'footer-subscribe',
          source:  'landing-page-footer',
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Treat silently — show success regardless of network (Zapier CORS edge case)
    }

    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}
