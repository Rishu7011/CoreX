import admin from "../admin/firebaseAdmin.js";
import User from "../models/user.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    let token = req.headers.authorization?.split(" ")[1] || req.cookies?.authToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token with Firebase
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // Firebase decoded user info
    req.token = token;

    // Check if token exists in DB
    const user = await User.findOne({ accessToken: token });
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userData = user; // Optional: attach DB user to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
