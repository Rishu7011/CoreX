const crypto = require("crypto");
const generateToken = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
module.exports = { generateToken };