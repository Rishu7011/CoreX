import { useState, useCallback } from "react";
import { apiPost } from "../utils/api";
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendMessage = useCallback(async (prompt) => {
    setLoading(true);
    setMessages((p) => [...p, { role: "user", content: prompt }]);
    try {
      const data = await apiPost("/api/chat", { prompt });
      setMessages((p) => [...p, { role: "assistant", content: data.reply }]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);
  return { messages, loading, sendMessage };
};
export default useChat;