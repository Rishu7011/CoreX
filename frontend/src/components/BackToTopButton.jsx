import React from "react";
import useScrollPosition from "../hooks/useScrollPosition";
const BackToTopButton = () => {
  const { y } = useScrollPosition();
  if (y < 300) return null;
  return (
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>
  );
};
export default BackToTopButton;