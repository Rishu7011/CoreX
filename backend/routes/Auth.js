import express from "express";
import User from "../models/user.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Signup or update user (protected)
router.post("/signup", verifyFirebaseToken, async (req, res) => {
  try {
    const { name, email, photo, provider } = req.body;
    const uid = req.user.uid; // from middleware

    let user = await User.findOne({ userId: uid });
    if (user) {
      user.name = name;
      user.avatar = photo;
      user.accessToken = req.token;
      await user.save();
      return res.status(200).json({ message: "User updated", user });
    }

    user = new User({
      userId: uid,
      name,
      email,
      avatar: photo,
      accessToken: req.token,
      provider,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Check auth (protected)
router.get("/checkauth", verifyFirebaseToken, async (req, res) => {
  res.status(200).json({ message: "User is authenticated", user: req.userData });
});

export default router;
