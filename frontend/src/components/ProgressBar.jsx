import React from "react";
const ProgressBar = ({ value = 0, max = 100, label }) => (
  <div className="progress-bar-wrapper" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
    {label && <span className="progress-label">{label}</span>}
    <div className="progress-track"><div className="progress-fill" style={{ width: `${(value/max)*100}%` }} /></div>
  </div>
);
export default ProgressBar;