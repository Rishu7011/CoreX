module.exports = (req, res, next) => {
  res.setHeader("Warning", "299 - API v1 is active");
  next();
};
