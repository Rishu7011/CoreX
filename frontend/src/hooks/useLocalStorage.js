import { useState } from "react";
const useLocalStorage = (key, init) => {
  const [v, setV] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; } });
  const set = (val) => { const s = val instanceof Function ? val(v) : val; setV(s); localStorage.setItem(key, JSON.stringify(s)); };
  return [v, set];
};
export default useLocalStorage;