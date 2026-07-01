import { rafThrottle } from './dom.js';

const callbacks = [];
let listenerAttached = false;

function notifyAll() {
  const scrollY = window.scrollY;
  callbacks.forEach((callback) => callback(scrollY));
}

const throttledNotify = rafThrottle(notifyAll);

export function onScroll(callback) {
  callbacks.push(callback);

  if (!listenerAttached) {
    window.addEventListener('scroll', throttledNotify, { passive: true });
    listenerAttached = true;
  }
}
