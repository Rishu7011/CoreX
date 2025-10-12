export const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
export const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
export const isWithinLength = (s, max) => s.length <= max;