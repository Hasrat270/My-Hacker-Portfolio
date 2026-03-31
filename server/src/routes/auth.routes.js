import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import protect from "../middleware/protect.js";
import validate from "../middleware/validate.js";
import {
  registerValidator,
  loginValidator,
  resetValidator,
} from "../middleware/validators.js";

const router = Router();
const { register, login, logout, forgotPassword, resetPassword } =
  authController();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.post("/logout", protect, logout);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetValidator, validate, resetPassword);

export default router;
