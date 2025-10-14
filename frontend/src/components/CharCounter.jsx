import React from "react";
const CharCounter = ({ value, max }) => {
  const r = max - value.length;
  return <span className={`char-counter ${r < 20 ? "char-counter-warn" : ""}`}>{r}</span>;
};
export default CharCounter;