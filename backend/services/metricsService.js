exports.getSystemMetrics = () => ({
  memoryUsage: process.memoryUsage(),
  uptime: process.uptime()
});
