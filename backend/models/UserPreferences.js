const mongoose = require("mongoose");
const prefSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  theme: { type: String, default: "dark" },
  fontSize: { type: String, default: "medium" }
});
module.exports = mongoose.model("UserPreferences", prefSchema);
