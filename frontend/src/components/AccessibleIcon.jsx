import React from "react";
const AccessibleIcon = ({ children, label }) => (
  <span role="img" aria-label={label}>{children}</span>
);
export default AccessibleIcon;