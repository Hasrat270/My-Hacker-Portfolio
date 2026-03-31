import mongoose from "mongoose";

const certSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    issuer: String,
    issueDate: Date,
    expiryDate: Date,
    credentialUrl: String,
    badgeUrl: String,
  },
  { timestamps: true },
);

export default mongoose.model("Certification", certSchema);
