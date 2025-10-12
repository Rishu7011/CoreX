import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

// ✅ Connect to DB only once at server startup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected with Database");
  } catch (err) {
    console.log(`❌ Failed to connect with DB: ${err}`);
    process.exit(1); // stops the server if DB fails
  }
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api", chatRoutes);
app.use("/api", AuthRoutes);

// ✅ Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// ✅ Start server after DB is connected
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});
