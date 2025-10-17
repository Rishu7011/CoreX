import React from "react";
const StatusDot = ({ status = "online" }) => (
  <span className={`status-dot status-${status}`} title={status} aria-label={`Status: ${status}`} />
);
export default StatusDot;