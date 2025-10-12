// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/Auth.js";

const app = express();

// Use Render's dynamic port or fallback to 8080
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", chatRoutes);
app.use("/api", authRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Connect to MongoDB
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ MONGODB_URI environment variable is missing!");
    process.exit(1); // Exit process if no DB URI
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Connected with Database");
  } catch (err) {
    console.error("❌ Failed to connect with DB:", err);
    process.exit(1); // Exit process if connection fails
  }
};

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  await connectDB();
});
