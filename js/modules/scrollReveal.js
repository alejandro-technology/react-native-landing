function initSectionReveal() {
  const sections = document.querySelectorAll('section:not(.hero)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

function initTechStackReveal() {
  const techGrid = document.querySelector('.tech-grid');
  if (!techGrid) return;

  const techItems = techGrid.querySelectorAll('.tech-item');
  techItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.tech-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 50);
        });
        techObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  techObserver.observe(techGrid);
}

function initStepsReveal() {
  const stepsContainer = document.querySelector('.steps');
  if (!stepsContainer) return;

  const steps = stepsContainer.querySelectorAll('.step');
  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepEls = entry.target.querySelectorAll('.step');
        stepEls.forEach((step, index) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
          }, index * 150);
        });
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  stepObserver.observe(stepsContainer);
}

export function initScrollReveal() {
  initSectionReveal();
  initTechStackReveal();
  initStepsReveal();
}
