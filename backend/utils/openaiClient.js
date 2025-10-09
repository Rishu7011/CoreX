const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const getChatCompletion = async (messages, model = "gpt-4o") => {
  const r = await openai.chat.completions.create({ model, messages });
  return r.choices[0].message.content;
};
module.exports = { openai, getChatCompletion };