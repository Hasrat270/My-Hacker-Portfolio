import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "./src/models/profile.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const p = await Profile.findOne();
  console.log("RESUME URL:", p.resume);
  process.exit(0);
});
