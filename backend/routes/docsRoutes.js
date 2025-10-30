const express = require("express");
const router = express.Router();
router.get("/docs.json", (req, res) => res.json({ title: "CoreX API Docs" }));
module.exports = router;
