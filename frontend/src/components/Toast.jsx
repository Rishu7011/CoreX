import React, { useEffect } from "react";
const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast toast-${type}`} role="alert">{message}</div>;
};
export default Toast;