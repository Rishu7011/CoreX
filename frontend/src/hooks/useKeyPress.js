import { useEffect } from "react";
const useKeyPress = (key, cb) => {
  useEffect(() => {
    const h = (e) => { if (e.key === key) cb(e); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [key, cb]);
};
export default useKeyPress;