function createMobileNav() {
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelector('.nav-links');

  if (window.innerWidth <= 640 && !document.querySelector('.mobile-menu-btn')) {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
      display: block;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
    `;

    menuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'var(--bg-secondary)';
      navLinks.style.padding = 'var(--spacing-lg)';
      navLinks.style.borderTop = '1px solid var(--border)';
    });

    nav.querySelector('.nav-content').appendChild(menuBtn);
  }
}

export function initMobileNav() {
  let resizeTimer;
  window.addEventListener('load', createMobileNav);
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createMobileNav, 150);
  }, { passive: true });
}
