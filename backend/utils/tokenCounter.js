const estimateTokens = (text) => Math.ceil(text.length / 4);
const isWithinLimit = (text, limit = 2048) => estimateTokens(text) <= limit;
module.exports = { estimateTokens, isWithinLimit };