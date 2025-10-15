import React from "react";
const Divider = ({ label }) => (
  <div className="divider">{label && <span className="divider-label">{label}</span>}</div>
);
export default Divider;