import React from "react";
const Badge = ({ label, color = "blue" }) => (
  <span className={`badge badge-${color}`}>{label}</span>
);
export default Badge;