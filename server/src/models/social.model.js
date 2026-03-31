import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // e.g. "GitHub", "HTB"
    url: { type: String, required: true },
    username: String,
  },
  { timestamps: true },
);

export default mongoose.model("Social", socialSchema);
