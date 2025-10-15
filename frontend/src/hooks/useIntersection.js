import { useEffect, useRef, useState } from "react";
const useIntersection = (opts = {}) => {
  const ref = useRef(null); const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), opts);
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};
export default useIntersection;