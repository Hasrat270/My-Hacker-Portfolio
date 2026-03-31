// server/src/models/writeup.model.js
import mongoose from "mongoose";

const writeupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    platform: { type: String, enum: ["HTB", "TryHackMe", "PortSwigger"] },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Insane"] },
    tags: [String], // e.g. ["SQLi", "Privilege Escalation"]
    url: String,
    publishedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Writeup", writeupSchema);
