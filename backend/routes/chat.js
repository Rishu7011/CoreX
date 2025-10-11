import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIResponse from "../utils/openai.js"
import tempThread from "../models/temp.js";
import User from "../models/user.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "testing new thread"
        })
        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in Db" });
    }
})

//Get all threads
router.get("/thread", async (req, res) => {
    try {
        let userId = req.headers['authorization'];
        console.log("userId from headers:", userId)
        //descending order of updated... most recent data on top
        const threads = await Thread.find({ userId }).sort({ updatedAt: -1 });
        res.json(threads);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failes to fetch threads" })
    }
})
router.get("/userData", async (req, res) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  
  try {
    // You can verify it with JWT if you’re using JWTs:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(decoded.id);

    // OR, if you’re storing the token directly in DB:
    const user = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});


//get a particular thread
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            res.status(404).json({ error: "thread not found" })
        }
        res.json(thread.messages)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failes to fetch chat" })
    }
})

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deleteThread = await Thread.findOneAndDelete({ threadId });
        if (!deleteThread) {
            res.status(404).json({ error: "Thread not found" })
        }
        res.status(200).json({ success: "thread successfully deleted" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failes to delete threads" })
    }
})
router.delete("/api/cleanup/:threadId", async (req, res) => {
    try {
        const { threadId } = req.params;
        // Delete or cleanup logic
        await tempThread.findOneAndDelete({ threadId });
        res.sendStatus(200);
    } catch (err) {
        console.error("Cleanup error:", err);
        res.sendStatus(500);
    }
});

router.post("/chat", async (req, res) => {
    const { threadId, message, token } = req.body;
    
    if (!threadId || !message) {
        res.status(400).json({ error: "missing required fields" })
    }


    try {
        if (!token || token.trim() === "") {
            let thread = await tempThread.findOne({ threadId });
            if (!thread) {
                thread = new tempThread({
                    threadId,
                    title: message,
                    messages: [{ role: "user", content: message }]
                });
            }else{
                thread.messages.push({ role: "user", content: message });
            }
            const assistantReply = await getOpenAIResponse(message);
            thread.messages.push({ role: "assistant", content: assistantReply });
            thread.updatedAt = new Date();
            await thread.save();
            return res.json({ reply: assistantReply });
        }
        let thread = await Thread.findOne({ threadId });
        console.log("token:", token);
        let userId = await User.findOne({ accessToken: token })
        

        if (!thread) {
            //create a new thread in DB

            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }],
                userId: userId ? userId : undefined
            })
        } else {
            thread.messages.push({ role: "user", content: message })
        }
        const assistantReply = await getOpenAIResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply })
        thread.updatedAt = new Date();
        await thread.save();
        res.json({ reply: assistantReply });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" })
    }
})

export default router;