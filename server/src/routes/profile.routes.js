import { Router } from "express";
import profileController from "../controllers/profile.controller.js";
import protect from "../middleware/protect.js";
import upload from "../utils/upload.js";

const router = Router();
const { getProfile, upsertProfile, uploadPic, updateResume } = profileController();


router.get("/", getProfile);


router.post("/", protect, upsertProfile);


router.post("/upload-pic", protect, upload.single("profilePic"), uploadPic);

router.post("/upload-resume", protect, upload.single("resume"), updateResume);

export default router;