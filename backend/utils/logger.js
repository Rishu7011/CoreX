const log = {
  info:  (msg, m={}) => console.log(JSON.stringify({ level:"info",  msg, ...m, ts: new Date().toISOString() })),
  warn:  (msg, m={}) => console.warn(JSON.stringify({ level:"warn",  msg, ...m, ts: new Date().toISOString() })),
  error: (msg, m={}) => console.error(JSON.stringify({ level:"error", msg, ...m, ts: new Date().toISOString() })),
};
module.exports = log;