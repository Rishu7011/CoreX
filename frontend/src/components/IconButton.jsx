import React from "react";
const IconButton = ({ icon, onClick, label, disabled }) => (
  <button className="icon-btn" onClick={onClick} aria-label={label} disabled={disabled}>{icon}</button>
);
export default IconButton;