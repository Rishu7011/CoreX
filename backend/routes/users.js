const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
router.get("/me", auth, (req, res) => res.json({ success: true, user: req.user }));
router.patch("/me", auth, async (req, res) => {
  try {
    req.user.name = req.body.name || req.user.name;
    await req.user.save();
    res.json({ success: true, user: req.user });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});
module.exports = router;