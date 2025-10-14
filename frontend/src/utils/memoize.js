const memoize = (fn) => {
  const cache = new Map();
  return (...args) => { const k = JSON.stringify(args); if (cache.has(k)) return cache.get(k); const r = fn(...args); cache.set(k, r); return r; };
};
export default memoize;