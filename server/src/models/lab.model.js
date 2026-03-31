import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    platform: {
      type: String,
      enum: ["PortSwigger", "HackTheBox", "TryHackMe"],
    },
    category: String, // e.g. "SQLi", "XSS", "SSRF"
    difficulty: {
      type: String,
      enum: ["Apprentice", "Practitioner", "Expert"],
    },
    solvedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Lab", labSchema);
