const createDOMPurify = require("dompurify");
module.exports = (html) => html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
