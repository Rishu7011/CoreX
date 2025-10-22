import React from "react";
export const LiveTypingIndicator = ({ isTyping }) => (
  isTyping ? <div className="live-typing">User is typing...</div> : null
);
