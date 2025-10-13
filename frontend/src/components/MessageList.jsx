import React from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ScrollToBottom from "./ScrollToBottom";
import EmptyState from "./EmptyState";
const MessageList = ({ messages, isTyping }) => (
  <div className="message-list">
    {messages.length === 0 ? <EmptyState title="Start a conversation" subtitle="Ask CoreX anything." /> :
      messages.map((m, i) => <MessageBubble key={i} role={m.role} content={m.content} timestamp={m.timestamp} />)}
    {isTyping && <TypingIndicator />}
    <ScrollToBottom trigger={messages.length} />
  </div>
);
export default MessageList;