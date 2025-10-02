module.exports = function(schema) {
  schema.add({ createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now } });
};
