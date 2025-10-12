import { useState, useCallback } from "react";
const useConfirm = () => {
  const [s, setS] = useState({ open: false, resolve: null });
  const confirm = useCallback(() => new Promise((r) => setS({ open: true, resolve: r })), []);
  const handleConfirm = () => { s.resolve(true); setS({ open: false, resolve: null }); };
  const handleCancel  = () => { s.resolve(false); setS({ open: false, resolve: null }); };
  return { isOpen: s.open, confirm, handleConfirm, handleCancel };
};
export default useConfirm;