const sanitizeInput = (str) =>
  typeof str === "string" ? str.replace(/<[^>]*>/g, "").trim() : "";
module.exports = sanitizeInput;