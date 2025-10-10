import mongoose from "mongoose";
// Define User Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    accessToken: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    avatar: {
      type: String, // URL to profile picture
      default: "",
    },
    provider: {
      type: String,
      enum: ["google", "github"],
      default: "local",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
