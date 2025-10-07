const required = ["MONGO_URI", "OPENAI_API_KEY", "SESSION_SECRET"];
const validateEnv = () => {
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) { console.error("Missing:", missing.join(", ")); process.exit(1); }
};
module.exports = validateEnv;