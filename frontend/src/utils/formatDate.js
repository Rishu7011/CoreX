export const formatRelative = (d) => {
  const mins = Math.floor((Date.now() - new Date(d)) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(d).toLocaleDateString();
};
export const formatFull = (d) => new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });