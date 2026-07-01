import * as THREE from 'three';

const PLANE_COLOR = 0x3b82c4;
const CONNECTOR_COLOR = 0xe8935a;
const MOBILE_BREAKPOINT = 768;
const LAYER_TILT = -Math.PI / 2.6;
const CONNECTOR_X_POSITIONS = [-20, -7, 7, 20];

const LAYERS = [
  { name: 'UI', position: [0, 9, 0], opacity: 0.5 },
  { name: 'Application', position: [0, 3, -12], opacity: 0.38 },
  { name: 'Infrastructure', position: [0, -3, -24], opacity: 0.28 },
  { name: 'Domain', position: [0, -9, -36], opacity: 0.2 }
];

function buildLayers(group) {
  const geometry = new THREE.PlaneGeometry(40, 24, 8, 8);

  LAYERS.forEach((layer) => {
    const material = new THREE.MeshBasicMaterial({
      color: PLANE_COLOR,
      wireframe: true,
      transparent: true,
      opacity: layer.opacity
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...layer.position);
    mesh.rotation.x = LAYER_TILT;
    group.add(mesh);
  });
}

function buildConnectors(group) {
  const vertices = [];

  CONNECTOR_X_POSITIONS.forEach((x) => {
    for (let i = 0; i < LAYERS.length - 1; i++) {
      const from = LAYERS[i].position;
      const to = LAYERS[i + 1].position;
      vertices.push(x, from[1], from[2]);
      vertices.push(x, to[1], to[2]);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.LineBasicMaterial({
    color: CONNECTOR_COLOR,
    transparent: true,
    opacity: 0.3
  });

  const connectors = new THREE.LineSegments(geometry, material);
  group.add(connectors);

  return material;
}

export function initHeroBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('.hero-canvas');
  if (!hero || !canvas) return;

  const isNarrow = window.innerWidth < MOBILE_BREAKPOINT;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    return;
  }

  renderer.setPixelRatio(isNarrow ? 1.5 : Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070c, 20, 90);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 4, 26);
  camera.lookAt(0, 0, -18);

  function sizeToHero() {
    const rect = hero.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  sizeToHero();

  const group = new THREE.Group();
  buildLayers(group);
  const connectorMaterial = buildConnectors(group);
  scene.add(group);

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  }

  hero.addEventListener('mousemove', handleMouseMove);

  const clock = new THREE.Clock();
  let autoRotationY = 0;
  let mouseYaw = 0;
  let mousePitch = 0;
  let animationFrameId = null;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    autoRotationY += 0.0008;
    const targetYaw = mouseX * 0.16;
    const targetPitch = mouseY * 0.1;
    mouseYaw += (targetYaw - mouseYaw) * 0.05;
    mousePitch += (targetPitch - mousePitch) * 0.05;

    group.rotation.y = autoRotationY + mouseYaw;
    group.rotation.x = mousePitch;
    group.position.y = window.scrollY * 0.08;

    connectorMaterial.opacity = 0.2 + Math.sin(elapsedTime * 0.6) * 0.12;

    renderer.render(scene, camera);
  }

  function startLoop() {
    if (animationFrameId === null) {
      animate();
    }
  }

  function stopLoop() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !document.hidden) {
        startLoop();
      } else {
        stopLoop();
      }
    });
  }, { threshold: 0 });

  visibilityObserver.observe(hero);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopLoop();
    } else {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        startLoop();
      }
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeToHero, 150);
  }, { passive: true });
}
