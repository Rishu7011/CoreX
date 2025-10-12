import React from "react";
const Drawer = ({ isOpen, onClose, children }) => (
  <>
    {isOpen && <div className="drawer-overlay" onClick={onClose} />}
    <div className={`drawer ${isOpen ? "drawer-open" : ""}`}>
      <button className="drawer-close" onClick={onClose}>×</button>
      {children}
    </div>
  </>
);
export default Drawer;