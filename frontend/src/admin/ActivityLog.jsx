import React from "react";
export const ActivityLog = ({ logs }) => (
  <div className="activity-log-list">{logs?.map((l, i) => <div key={i}>{l}</div>)}</div>
);
