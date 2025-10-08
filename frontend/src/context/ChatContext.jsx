import React, { createContext, useContext } from "react";
import useChat from "../hooks/useChat";
const ChatContext = createContext(null);
export const ChatProvider = ({ children }) => {
  const chat = useChat();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};
export const useChatContext = () => useContext(ChatContext);