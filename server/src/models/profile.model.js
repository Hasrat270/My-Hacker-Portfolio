import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: String, // e.g. "Penetration Tester"
    bio: String,
    profilePic: String, // Cloudinary URL
    email: String,
    phone: String,
    whatsapp: String,
  },
  { timestamps: true },
);

export default mongoose.model("Profile", profileSchema);
