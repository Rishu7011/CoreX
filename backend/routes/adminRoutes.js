const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/AdminController");
router.get("/stats", adminCtrl.getStats);
module.exports = router;
