const allowedOrigins = ["http://localhost:5173", "https://corex.app"];
module.exports = (origin) => allowedOrigins.includes(origin);
