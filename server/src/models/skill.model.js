import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Web", "Network", "Forensics"
    level: { type: Number, min: 1, max: 100 },
    icon: String,
  },
  { timestamps: true },
);

export default mongoose.model("Skill", skillSchema);
