module.exports = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => console.log(`Query took ${Date.now() - start}ms`));
  next();
};
