module.exports = (req, res, next) => {
  const token = req.headers["x-csrf-token"];
  if (token) return next();
  res.status(403).json({ error: "CSRF token missing" });
};
