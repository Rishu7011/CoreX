import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.post("/test", async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'openai/gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: req.body.message,
                },
            ],
        })
    }
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        const data = await response.json();
        // console.log(data.choices[0].message.content);
        res.send(data.choices[0].message.content);
    } catch (err) {
        console.error(err);
    }
});
fetch("https://openrouter.ai/api/v1")

// import OpenAI from 'openai';
// import 'dotenv/config';

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENAI_API_KEY,
//   defaultHeaders: {
//     'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
//     'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
//   },
// });

// async function main() {
//   const completion = await openai.chat.completions.create({
//     model: 'openai/gpt-4o',
//     messages: [
//       {
//         role: 'user',
//         content: '',
//       },
//     ],
//   });

//   console.log(completion.choices[0].message);
// }

// main();
