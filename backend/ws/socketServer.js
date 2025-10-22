const { Server } = require("socket.io");
exports.initWS = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => console.log("WS connected:", socket.id));
};
