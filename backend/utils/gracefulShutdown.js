module.exports = (server) => {
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => process.exit(0));
  });
};
