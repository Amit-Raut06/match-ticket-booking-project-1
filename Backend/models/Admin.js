import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedMatches: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Match",
    },
  ],
});

export default mongoose.model("Admin", adminSchema);
