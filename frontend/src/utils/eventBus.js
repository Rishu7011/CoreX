const listeners = {};
export const on   = (e, fn) => (listeners[e] = listeners[e] || []).push(fn);
export const off  = (e, fn) => (listeners[e] = (listeners[e] || []).filter((f) => f !== fn));
export const emit = (e, d) => (listeners[e] || []).forEach((fn) => fn(d));