import express from "express";
import User from "../models/user.js";
import admin from "../admin/firebaseAdmin.js"; // import admin SDK

const router = express.Router();

// ✅ Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  // Try Authorization header first
  let token = req.headers.authorization?.split(" ")[1];

  // If not present, try cookie
  if (!token && req.cookies?.authToken) {
    token = req.cookies.authToken;
  }

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


// ✅ Route: Save or update user
router.post("/signup", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, name, email, photo , provider} = req.body;

    // Check if user exists
    let user = await User.findOne({ userId: uid });
    if (user) {
      // update if user already exists
      user.name = name;
      user.photo = photo;
      await user.save();
      return res.status(200).json({
        message: "User already exists, updated info",
        user,
      });
    }

    // create new user if not exists
    user = new User({
      userId: uid,
      name,
      email,
      avatar: photo,
      accessToken: req.headers.authorization?.split(" ")[1], // Store the token
      provider
    });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
