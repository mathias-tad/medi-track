import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    position: {
      type: String,
      require: true,
      enum: ["admin", "doctor", "nurse", "labtech", "reg", "finance"],
    },
    resetOTP: { type: String, default: "" },
    resetOTPExpiresAt: { type: String, default: 0 },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
