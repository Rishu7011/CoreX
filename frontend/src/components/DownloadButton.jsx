import React from "react";
export const DownloadButton = ({ onClick, loading }) => (
  <button onClick={onClick} disabled={loading}>{loading ? "Downloading..." : "Export Chat"}</button>
);
