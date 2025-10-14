const formatChatTitle = (prompt, max = 40) => {
  const c = prompt.replace(/[^\w\s]/gi, "").trim();
  return c.length > max ? c.slice(0, max) + "…" : c;
};
module.exports = formatChatTitle;