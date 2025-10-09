const rateMap = new Map();
const WINDOW = 60000; const MAX = 30;
const rateLimiter = (req, res, next) => {
  const ip = req.ip; const now = Date.now();
  const e = rateMap.get(ip) || { count: 0, start: now };
  if (now - e.start > WINDOW) { e.count = 0; e.start = now; }
  e.count++; rateMap.set(ip, e);
  if (e.count > MAX) return res.status(429).json({ message: "Too many requests" });
  next();
};
module.exports = rateLimiter;