const bcrypt = require("bcryptjs");
const hashPassword = (p) => bcrypt.hash(p, 12);
const comparePassword = (p, h) => bcrypt.compare(p, h);
module.exports = { hashPassword, comparePassword };