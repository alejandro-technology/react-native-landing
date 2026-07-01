export function initReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-duration', '0s');

    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }';
    document.head.appendChild(style);
  }
}
