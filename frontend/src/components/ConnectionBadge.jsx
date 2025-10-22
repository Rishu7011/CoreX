import React from "react";
export const ConnectionBadge = ({ status }) => (
  <span className={`badge ${status}`}>{status}</span>
);
