import React, { useState, useEffect } from "react";
const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return <button className="theme-toggle" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">{dark ? "☀️" : "🌙"}</button>;
};
export default ThemeToggle;