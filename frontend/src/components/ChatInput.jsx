import React, { useState } from "react";
const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => { e.preventDefault(); if (!value.trim()) return; onSend(value.trim()); setValue(""); };
  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea className="chat-input" value={value} onChange={(e) => setValue(e.target.value)}
        placeholder="Ask CoreX anything..." disabled={disabled} rows={1}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSubmit(e); }} />
      <button type="submit" disabled={disabled || !value.trim()} className="send-btn">Send</button>
    </form>
  );
};
export default ChatInput;