module.exports = (socket) => {
  socket.on("stream-start", (data) => console.log("Stream started"));
};
