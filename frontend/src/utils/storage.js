export const setItem = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
export const getItem = (k, fb = null) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb; } catch { return fb; } };
export const removeItem = (k) => localStorage.removeItem(k);
export const clearAll = () => localStorage.clear();