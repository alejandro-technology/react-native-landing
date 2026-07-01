export function rafThrottle(callback) {
  let ticking = false;

  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      callback(...args);
      ticking = false;
    });
  };
}
