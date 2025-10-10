const store = new Map();
const set = (k, v, ttl = 60000) => store.set(k, { value: v, exp: Date.now() + ttl });
const get = (k) => { const e = store.get(k); if (!e) return null; if (Date.now() > e.exp) { store.delete(k); return null; } return e.value; };
const del = (k) => store.delete(k);
module.exports = { set, get, del };