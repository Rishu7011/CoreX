const buildMessages = (systemPrompt, chatMessages) => [
  { role: "system", content: systemPrompt },
  ...chatMessages.map(({ role, content }) => ({ role, content })),
];
module.exports = { buildMessages };