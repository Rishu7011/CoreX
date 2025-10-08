const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const apiPost = async (endpoint, body) => {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    credentials: "include", body: JSON.stringify(body),
  });
  return res.json();
};
export const apiGet = async (endpoint) => {
  const res = await fetch(`${BASE}${endpoint}`, { credentials: "include" });
  return res.json();
};