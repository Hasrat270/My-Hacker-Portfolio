import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    os: { type: String, enum: ["Linux", "Windows"] },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Insane"] },
    points: Number,
    solvedAt: Date,
    writeupUrl: String,
    tags: [String],
    details: String, // machine ka description / approach
  },
  { timestamps: true },
);

export default mongoose.model("Machine", machineSchema);
