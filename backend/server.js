import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api",chatRoutes)
app.use("/api",AuthRoutes)
app.use(cookieParser());



app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB()
})
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected with Database")

    }catch(err){
        console.log(`Failed to connect with DB ${err}`);
    }
}

// app.post("/test", async (req, res) => {
//     const options = {
//         method: 'POST',
//         headers: {
//             "content-type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: 'openai/gpt-4o',
//             messages: [
//                 {
//                     role: 'user',
//                     content: req.body.message,
//                 },
//             ],
//         })
//     }
//     try {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
//         const data = await response.json();
//         // console.log(data.choices[0].message.content);
//         res.send(data.choices[0].message.content);
//     } catch (err) {
//         console.error(err);
//     }
// });


