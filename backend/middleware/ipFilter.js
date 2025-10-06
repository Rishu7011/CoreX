const blocklist = [];
module.exports = (req, res, next) => {
  if (blocklist.includes(req.ip)) return res.status(403).json({ error: "Access denied" });
  next();
};
