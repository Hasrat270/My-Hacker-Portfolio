import asyncHandler from "../utils/asyncHandler.js";
import Profile from "../models/profile.model.js";
import cloudinary from "../config/cloudinary.js";

export default function profileController() {
  const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne();
    res.json(profile);
  });

  const upsertProfile = asyncHandler(async (req, res) => {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
    } else {
      profile = await Profile.create(req.body);
    }
    res.json(profile);
  });

  const uploadPic = asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Purani pic delete karo cloudinary se
    if (profile.profilePic) {
      const publicId = profile.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`hacker-portfolio/${publicId}`);
    }

    profile.profilePic = req.file.path;
    await profile.save();
    res.json({ profilePic: profile.profilePic });
  });

  // Resume update karne ka logic
  const uploadResume = asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    const profile = await Profile.findOne(); // Portfolio ka aik hi profile hota hai
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Cloudinary ka URL profile model ke resume field mein save karein
    profile.resume = req.file.path;
    await profile.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: profile.resume,
    });
  });

  return { getProfile, upsertProfile, uploadPic, uploadResume };
}
