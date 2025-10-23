const express = require("express");
const router = express.Router();
router.get("/:id/export", (req, res) => res.json({ status: "exported" }));
module.exports = router;
