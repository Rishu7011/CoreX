import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, accessToken, avatar, provider, userId } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        message: "User already exists",
        accessToken: userExists.accessToken,
        user: userExists,
      });
    }

    const user = await User.create({ name, email, accessToken, avatar, provider, userId });
    res.status(201).json({
      message: "User registered successfully",
      accessToken: user.accessToken,
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
