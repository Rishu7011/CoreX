import React from "react";
const Button = ({ children, onClick, disabled, variant = "primary", type = "button" }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
    {children}
  </button>
);
export default Button;