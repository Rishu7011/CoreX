import { useRef, useCallback } from "react";
const useFocus = () => { const r = useRef(null); const f = useCallback(() => r.current?.focus(), []); return [r, f]; };
export default useFocus;