// Pagination helper — use with Mongoose queries
const buildPagination = (page = 1, limit = 20) => ({
  skip: (page - 1) * limit,
  limit: Math.min(parseInt(limit, 10), 100), // cap at 100
});
module.exports = buildPagination;