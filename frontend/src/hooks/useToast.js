import { useState, useCallback } from "react";
const useToast = () => {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = "info") => setToast({ message, type }), []);
  const clearToast = useCallback(() => setToast(null), []);
  return { toast, showToast, clearToast };
};
export default useToast;