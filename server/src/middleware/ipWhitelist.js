import asyncHandler from "../utils/asyncHandler.js";

/**
 * Middleware to restrict access based on IP address.
 * Reads ALLOWED_IPS from .env (comma-separated).
 * If empty, checks are skipped.
 */
const ipWhitelist = asyncHandler(async (req, res, next) => {
  const allowedIpsStr = process.env.ALLOWED_IPS;
  
  if (!allowedIpsStr) {
    return next();
  }

  const allowedIps = allowedIpsStr.split(",").map(ip => ip.trim());
  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Clean up IPv6 mapped IPv4 addresses (e.g., ::ffff:127.0.0.1)
  const cleanIp = clientIp.replace(/^.*:/, '');

  if (allowedIps.includes(cleanIp) || allowedIps.includes(clientIp)) {
    return next();
  }

  console.warn(`[SECURITY] Blocked unauthorized access from IP: ${clientIp}`);
  res.status(403).json({ 
    message: "Forbidden: Your IP is not whitelisted for administrative access." 
  });
});

export default ipWhitelist;
