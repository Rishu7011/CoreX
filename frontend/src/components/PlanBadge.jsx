import React from "react";
const PlanBadge = ({ plan = "free" }) => (
  <span className={`plan-badge plan-${plan}`}>{plan === "pro" ? "⚡ Pro" : "🆓 Free"}</span>
);
export default PlanBadge;