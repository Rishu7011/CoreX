const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.get("/metrics", auth, (req, res) => {
  res.json({
    uptime: process.uptime(),
    memoryMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});
module.exports = router;