const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.get("/status", auth, (req, res) => res.json({ plan: req.user.plan, messageCount: req.user.messageCount }));
module.exports = router;