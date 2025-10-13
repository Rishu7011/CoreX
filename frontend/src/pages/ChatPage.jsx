import React from "react";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { useChatContext } from "../context/ChatContext";
const ChatPage = () => {
  const { messages, loading, sendMessage } = useChatContext();
  return (
    <div className="chat-page">
      <main className="chat-main">
        <MessageList messages={messages} isTyping={loading} />
        <ChatInput onSend={sendMessage} disabled={loading} />
      </main>
    </div>
  );
};
export default ChatPage;