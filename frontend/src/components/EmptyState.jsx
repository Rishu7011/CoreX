import React from "react";
const EmptyState = ({ title = "No chats yet", subtitle = "Start a new conversation!" }) => (
  <div className="empty-state">
    <div className="empty-icon">💬</div>
    <h3 className="empty-title">{title}</h3>
    <p className="empty-subtitle">{subtitle}</p>
  </div>
);
export default EmptyState;