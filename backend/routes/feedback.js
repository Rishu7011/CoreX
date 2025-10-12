const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.post("/", auth, (req, res) => {
  const { messageId, type } = req.body;
  console.log(`Feedback: ${type} for ${messageId} by ${req.user._id}`);
  res.json({ success: true });
});
module.exports = router;