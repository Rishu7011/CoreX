import { useEffect } from "react";
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const l = (e) => { if (!ref.current || ref.current.contains(e.target)) return; handler(e); };
    document.addEventListener("mousedown", l); document.addEventListener("touchstart", l);
    return () => { document.removeEventListener("mousedown", l); document.removeEventListener("touchstart", l); };
  }, [ref, handler]);
};
export default useOnClickOutside;