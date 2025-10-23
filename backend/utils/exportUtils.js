exports.toJSON = (chat) => JSON.stringify(chat, null, 2);
exports.toMarkdown = (chat) => chat.messages.map(m => `**${m.role}**: ${m.content}`).join("

");
