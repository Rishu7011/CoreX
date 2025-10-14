const cors = require("cors");
const allowed = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",");
module.exports = cors({
  origin: (origin, cb) => (!origin || allowed.includes(origin)) ? cb(null, true) : cb(new Error("CORS blocked")),
  credentials: true,
});