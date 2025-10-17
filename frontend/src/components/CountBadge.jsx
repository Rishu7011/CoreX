import React from "react";
const CountBadge = ({ count }) => {
  if (!count || count < 1) return null;
  return <span className="count-badge">{count > 99 ? "99+" : count}</span>;
};
export default CountBadge;