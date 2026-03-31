import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    whatsapp: String,
  },
  { timestamps: true },
);

export default mongoose.model("Contact", contactSchema);
