// ===== Smooth Scroll =====
function scrollToQuickStart() {
  const quickstart = document.getElementById('quickstart');
  if (quickstart) {
    quickstart.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== Navigation Scroll Effect + Parallax (merged, throttled, passive) =====
const nav = document.querySelector('.nav');
const gradientBg = document.querySelector('.gradient-bg');
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Nav scrolled state
      nav.classList.toggle('scrolled', scrollY > 100);

      // Parallax hero background
      if (gradientBg && scrollY < window.innerHeight) {
        gradientBg.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// ===== Tab Switching =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.example-pane');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');

    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button and corresponding pane
    button.classList.add('active');
    const targetPane = document.getElementById(targetTab);
    if (targetPane) {
      targetPane.classList.add('active');
    }
  });
});

// ===== Copy Command to Clipboard =====
async function copyCommand() {
  const command = 'npx create-react-native-tui';
  const copyBtn = document.getElementById('copy-text');
  const originalText = copyBtn.textContent;

  try {
    await navigator.clipboard.writeText(command);

    // Success feedback
    copyBtn.textContent = '✓ Copied to clipboard!';
    copyBtn.parentElement.classList.add('btn-success');

    // Reset after 2 seconds
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.parentElement.classList.remove('btn-success');
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);

    // Fallback feedback
    copyBtn.textContent = '✗ Failed to copy';

    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  }
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// ===== Feature Card Hover Effect =====
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== Layer Animation on Hover =====
const layers = document.querySelectorAll('.layer');
let currentLayerIndex = -1;

// Auto-animate layers on first view
const layerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && currentLayerIndex === -1) {
      animateLayers();
      layerObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const architectureDiagram = document.querySelector('.architecture-diagram');
if (architectureDiagram) {
  layerObserver.observe(architectureDiagram);
}

function animateLayers() {
  let delay = 0;
  layers.forEach((layer, index) => {
    setTimeout(() => {
      layer.style.transform = 'translateX(8px)';
      setTimeout(() => {
        layer.style.transform = 'translateX(0)';
      }, 300);
    }, delay);
    delay += 200;
  });
}

// Parallax handled in merged scroll listener above

// ===== Tech Stack Item Stagger Animation =====
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const techItems = entry.target.querySelectorAll('.tech-item');
      techItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 50);
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const techGrid = document.querySelector('.tech-grid');
if (techGrid) {
  const techItems = techGrid.querySelectorAll('.tech-item');
  techItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });
  techObserver.observe(techGrid);
}

// ===== Step Animation =====
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.step');
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }, index * 150);
      });
      stepObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const stepsContainer = document.querySelector('.steps');
if (stepsContainer) {
  const steps = stepsContainer.querySelectorAll('.step');
  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  stepObserver.observe(stepsContainer);
}

// ===== Smooth Anchor Links =====
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

// ===== Code Syntax Highlighting Enhancement =====
document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    // Add copy button to code blocks
    const wrapper = block.closest('.hero-code, .example-content');
    if (wrapper && !wrapper.querySelector('.code-copy-btn')) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '📋';
      copyBtn.title = 'Copy code';
      copyBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(99, 102, 241, 0.2);
        border: 1px solid rgba(99, 102, 241, 0.3);
        color: var(--text-primary);
        padding: 0.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        z-index: 10;
      `;

      copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = 'rgba(99, 102, 241, 0.3)';
        copyBtn.style.transform = 'scale(1.1)';
      });

      copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.background = 'rgba(99, 102, 241, 0.2)';
        copyBtn.style.transform = 'scale(1)';
      });

      copyBtn.addEventListener('click', async () => {
        const code = block.textContent;
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.innerHTML = '✓';
          setTimeout(() => {
            copyBtn.innerHTML = '📋';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      wrapper.style.position = 'relative';
      wrapper.appendChild(copyBtn);
    }
  });

  // ===== Hero Code Copy Buttons =====
  document.querySelectorAll('.copy-line-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeRow = btn.closest('.code-row');
      const code = codeRow.querySelector('code').textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.classList.add('success');
        
        setTimeout(() => {
          btn.innerHTML = originalIcon;
          btn.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

  // ===== Step Code Copy Buttons =====
  document.querySelectorAll('.copy-step-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.getAttribute('data-code');
      
      try {
        await navigator.clipboard.writeText(code);
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.classList.add('success');
        
        setTimeout(() => {
          btn.innerHTML = originalIcon;
          btn.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
});

// ===== Mobile Navigation Toggle =====
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

// Initialize mobile nav on load and resize (debounced to avoid repeated calls)
let resizeTimer;
window.addEventListener('load', createMobileNav);
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(createMobileNav, 150);
}, { passive: true });

// ===== Performance: Reduce animations on low-end devices =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--transition-duration', '0s');

  // Disable all animations
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }';
  document.head.appendChild(style);
}

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-konamiPattern.length);

  if (konamiCode.join(',') === konamiPattern.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s linear infinite';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

console.log('%c🚀 RN Clean Architecture Template', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out: https://github.com/CrisangerA/react-native-template', 'font-size: 12px; color: #64748b;');
