import { Router } from "express";
import profileController from "../controllers/profile.controller.js";
import protect from "../middleware/protect.js";
import upload from "../utils/upload.js";

const router = Router();
const { getProfile, upsertProfile, uploadPic } = profileController();

router.get("/", getProfile);
router.put("/", protect, upsertProfile);
router.post("/upload-pic", protect, upload.single("profilePic"), uploadPic);

export default router;
