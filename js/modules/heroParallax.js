import { onScroll } from '../utils/scrollDispatcher.js';

export function initHeroParallax() {
  const gradientBg = document.querySelector('.gradient-bg');
  if (!gradientBg) return;

  onScroll((scrollY) => {
    if (scrollY < window.innerHeight) {
      gradientBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  });
}
