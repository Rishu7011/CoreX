import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => s.disconnect();
  }, []);
  return socket;
};
