import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apiGet("/api/auth/me").then((d) => setUser(d.user || null)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  return { user, loading };
};
export default useAuth;