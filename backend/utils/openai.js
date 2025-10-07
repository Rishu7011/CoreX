import "dotenv/config";

const getOpenAIResponse = async(message)=>{
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
                    content: message,
                },
            ],
        })
    }
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        const data = await response.json();
        // console.log(data.choices[0].message.content);
        return data.choices[0].message.content
    } catch (err) {
        console.error(err);
    }
}

export default getOpenAIResponse;