import { onScroll } from '../utils/scrollDispatcher.js';

export function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  onScroll((scrollY) => {
    nav.classList.toggle('scrolled', scrollY > 100);
  });
}

export function initScrollToQuickStart() {
  const ctaBtn = document.getElementById('hero-cta-btn');
  if (!ctaBtn) return;

  ctaBtn.addEventListener('click', () => {
    const quickstart = document.getElementById('quickstart');
    if (quickstart) {
      quickstart.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

export function initSmoothAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
