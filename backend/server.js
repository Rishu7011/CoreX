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
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});




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




