import React from "react";
const MessageBubble = ({ role, content, timestamp }) => (
  <div className={`message-bubble ${role === "user" ? "user" : "assistant"}`}>
    <p className="message-content">{content}</p>
    {timestamp && <span className="message-time">{new Date(timestamp).toLocaleTimeString()}</span>}
  </div>
);
export default MessageBubble;