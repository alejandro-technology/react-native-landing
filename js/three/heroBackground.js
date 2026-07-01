import * as THREE from 'three';

const PRIMARY_COLOR = 0x0ea5e9;
const MOBILE_BREAKPOINT = 768;
const CONNECTION_DISTANCE = 14;
const MAX_ROTATION = 0.15;
const BOUNDS = { x: 40, y: 25, z: 20 };

function createParticles(count) {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;

    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  return { positions, velocities };
}

function wrapValue(value, bound) {
  if (value > bound) return -bound;
  if (value < -bound) return bound;
  return value;
}

export function initHeroBackground() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const hero = document.querySelector('.hero');
  const canvas = document.querySelector('.hero-canvas');
  if (!hero || !canvas) return;

  const isNarrow = window.innerWidth < MOBILE_BREAKPOINT;
  const particleCount = isNarrow ? 50 : 120;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    return;
  }

  renderer.setPixelRatio(isNarrow ? 1.5 : Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 50;

  function sizeToHero() {
    const rect = hero.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  sizeToHero();

  const { positions, velocities } = createParticles(particleCount);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: PRIMARY_COLOR,
    size: 0.6,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const points = new THREE.Points(geometry, material);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: PRIMARY_COLOR,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const maxConnections = Math.min(particleCount * 4, 400);
  const linePositions = new Float32Array(maxConnections * 2 * 3);
  const lineAttribute = new THREE.Float32BufferAttribute(linePositions, 3);
  lineAttribute.setUsage(THREE.DynamicDrawUsage);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', lineAttribute);
  lineGeometry.setDrawRange(0, 0);

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

  const group = new THREE.Group();
  group.add(points);
  group.add(lines);
  scene.add(group);

  function updateLines() {
    const positionArray = lineAttribute.array;
    let connectionsFound = 0;

    outer:
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        if (connectionsFound >= maxConnections) break outer;

        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < CONNECTION_DISTANCE) {
          const offset = connectionsFound * 6;
          positionArray[offset] = positions[i * 3];
          positionArray[offset + 1] = positions[i * 3 + 1];
          positionArray[offset + 2] = positions[i * 3 + 2];
          positionArray[offset + 3] = positions[j * 3];
          positionArray[offset + 4] = positions[j * 3 + 1];
          positionArray[offset + 5] = positions[j * 3 + 2];
          connectionsFound++;
        }
      }
    }

    lineAttribute.needsUpdate = true;
    lineGeometry.setDrawRange(0, connectionsFound * 2);
  }

  let mouseTargetX = 0;

  function handleMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseTargetX = normalizedX * MAX_ROTATION * 2;
  }

  hero.addEventListener('mousemove', handleMouseMove);

  let frameCount = 0;
  let animationFrameId = null;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    frameCount++;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      positions[i * 3] = wrapValue(positions[i * 3], BOUNDS.x);
      positions[i * 3 + 1] = wrapValue(positions[i * 3 + 1], BOUNDS.y);
      positions[i * 3 + 2] = wrapValue(positions[i * 3 + 2], BOUNDS.z);
    }
    geometry.attributes.position.needsUpdate = true;

    if (frameCount % 2 === 0) {
      updateLines();
    }

    group.rotation.y += (mouseTargetX - group.rotation.y) * 0.05;
    group.position.y = window.scrollY * 0.15;

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
