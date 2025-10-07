const sendSuccess = (res, data, code = 200) => res.status(code).json({ success: true, data });
const sendError = (res, msg, code = 400) => res.status(code).json({ success: false, message: msg });
module.exports = { sendSuccess, sendError };