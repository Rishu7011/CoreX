const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const wrap = require("../utils/asyncWrapper");
const { getChatCompletion } = require("../utils/openaiClient");
const { buildMessages } = require("../utils/chatHistory");
const sanitize = require("../utils/sanitize");
const Chat = require("../models/Chat");
const SYS = "You are CoreX, a helpful and concise AI assistant.";
router.post("/", auth, wrap(async (req, res) => {
  const clean = sanitize(req.body.prompt);
  if (!clean) return res.status(400).json({ message: "Prompt required" });
  const chat = req.body.chatId
    ? await Chat.findOne({ _id: req.body.chatId, userId: req.user._id })
    : new Chat({ userId: req.user._id, title: clean.slice(0, 40) });
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  chat.messages.push({ role: "user", content: clean });
  const reply = await getChatCompletion(buildMessages(SYS, chat.messages));
  chat.messages.push({ role: "assistant", content: reply });
  await chat.save();
  res.json({ reply, chatId: chat._id });
}));
module.exports = router;