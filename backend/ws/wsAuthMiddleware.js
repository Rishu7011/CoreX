module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) return next();
  next(new Error("Authentication error"));
};
