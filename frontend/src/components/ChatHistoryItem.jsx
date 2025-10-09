import React from "react";
const ChatHistoryItem = ({ title, active, onClick, onDelete }) => (
  <div className={`chat-history-item ${active ? "active" : ""}`} onClick={onClick}>
    <span className="chat-title">{title || "Untitled Chat"}</span>
    <button className="delete-chat-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>×</button>
  </div>
);
export default ChatHistoryItem;