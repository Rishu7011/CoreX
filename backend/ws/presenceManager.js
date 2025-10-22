const activeUsers = new Set();
exports.add = (id) => activeUsers.add(id);
exports.remove = (id) => activeUsers.delete(id);
