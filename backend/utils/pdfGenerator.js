const PDFDocument = require("pdfkit");
exports.createChatPDF = (chat, res) => {
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.text(chat.title);
  doc.end();
};
