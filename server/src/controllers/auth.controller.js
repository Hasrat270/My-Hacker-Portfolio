import crypto from "crypto";
import generateToken from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

export default function authController() {

  const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // SINGLE USER MODE: Check if a user already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ 
        message: "Registration Locked: This system is in single-user mode." 
      });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(res, user._id);

    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
  });

  const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res, user._id);
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  });

  const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out" });
  });

  const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Reset your password: <a href="${resetURL}">${resetURL}</a></p>
           <p>This link expires in 15 minutes.</p>`,
    });

    res.json({ message: "Reset email sent" });
  });

  const resetPassword = asyncHandler(async (req, res) => {
    const hashed = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  });

  return { register, login, logout, forgotPassword, resetPassword };
}
