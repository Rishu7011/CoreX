import React from "react";
const SkeletonLoader = ({ lines = 3, width = "100%" }) => (
  <div className="skeleton-wrapper" aria-busy="true">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="skeleton-line" style={{ width: i === lines - 1 ? "60%" : width }} />
    ))}
  </div>
);
export default SkeletonLoader;