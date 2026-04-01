import mongoose from "mongoose";

const writeupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, enum: ["HTB", "TryHackMe", "PortSwigger"] },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Insane"] },
    tags: [String],
    url: String,
    content: String, // Markdown — images as URLs ya direct base64
    coverImage: String, // Cloudinary URL — optional thumbnail
    publishedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Writeup", writeupSchema);