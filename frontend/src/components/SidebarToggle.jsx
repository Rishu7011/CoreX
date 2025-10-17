import React from "react";
const SidebarToggle = ({ collapsed, onToggle }) => (
  <button className={`sidebar-toggle ${collapsed ? "collapsed" : ""}`} onClick={onToggle} aria-label="Toggle sidebar">
    {collapsed ? "▶" : "◀"}
  </button>
);
export default SidebarToggle;