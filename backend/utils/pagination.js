const paginate = (page = 1, limit = 20) => ({ skip: (page-1) * limit, limit: parseInt(limit, 10) });
module.exports = paginate;