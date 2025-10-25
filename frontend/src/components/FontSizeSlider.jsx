import React from "react";
export const FontSizeSlider = ({ value, onChange }) => (
  <input type="range" min="12" max="24" value={value} onChange={onChange} />
);
