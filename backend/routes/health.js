const express = require("express");
const router = express.Router();
router.get("/health", (req, res) => {
  res.json({ status: "OK", uptime: process.uptime(), ts: Date.now() });
});
module.exports = router;