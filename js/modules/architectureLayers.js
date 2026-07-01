export function initArchitectureLayers() {
  const layers = document.querySelectorAll('.layer');
  const currentLayerIndex = -1;

  function animateLayers() {
    let delay = 0;
    layers.forEach(layer => {
      setTimeout(() => {
        layer.style.transform = 'translateX(8px)';
        setTimeout(() => {
          layer.style.transform = 'translateX(0)';
        }, 300);
      }, delay);
      delay += 200;
    });
  }

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
}
