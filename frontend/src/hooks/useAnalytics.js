import { useCallback } from "react";
const track = (e, p={}) => console.debug("[Analytics]", e, p);
const useAnalytics = () => ({ trackEvent: useCallback((e, p) => track(e, p), []) });
export default useAnalytics;