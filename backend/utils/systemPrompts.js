const PROMPTS = {
  default: "You are CoreX, a helpful and concise AI assistant.",
  coder:   "You are CoreX in Coder mode. Provide code with explanations.",
  writer:  "You are CoreX in Writer mode. Help with writing and grammar.",
  analyst: "You are CoreX in Analyst mode. Give structured, data-driven analysis.",
};
const getPrompt = (mode = "default") => PROMPTS[mode] || PROMPTS.default;
module.exports = { getPrompt, PROMPTS };