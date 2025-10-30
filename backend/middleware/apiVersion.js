module.exports = (version) => (req, res, next) => {
  req.apiVersion = version;
  next();
};
