import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: String,
    bio: String,
    profilePic: String, // Cloudinary URL
    resume: String, // Cloudinary PDF URL
    email: String,
    phone: String,
    whatsapp: String,
    htbMachines: String, // ← add
    cves: String, // ← add
    ctfWins: String, // ← add
    bugBounties: String, // ← add
    labsSolved: String, // ← add
    rank: String, // ← add
  },
  { timestamps: true },
);

export default mongoose.model("Profile", profileSchema);
