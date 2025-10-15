import React from "react";
import useIntersection from "../hooks/useIntersection";
const LazyImage = ({ src, alt, className }) => {
  const [ref, visible] = useIntersection({ threshold: 0.1 });
  return (
    <div ref={ref} className={`lazy-image-wrapper ${className || ""}`}>
      {visible ? <img src={src} alt={alt} className="lazy-image" /> : <div className="lazy-placeholder" />}
    </div>
  );
};
export default LazyImage;