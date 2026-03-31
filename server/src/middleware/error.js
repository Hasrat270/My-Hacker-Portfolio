export default function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || "Server Error";

  console.error(`[${req.method}] ${req.url} → ${message}`);
  res.status(status).json({ message });
}
