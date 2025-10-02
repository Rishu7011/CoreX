const mongoose = require("mongoose");
const auditSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ip: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model("AuditLog", auditSchema);
