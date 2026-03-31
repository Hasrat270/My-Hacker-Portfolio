import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.userId).select("-password");
  next();
}
