import React from "react";
import useNetworkStatus from "../hooks/useNetworkStatus";
const OfflineBanner = () => {
  const online = useNetworkStatus();
  if (online) return null;
  return <div className="offline-banner" role="alert">⚠️ You are offline. Check your connection.</div>;
};
export default OfflineBanner;