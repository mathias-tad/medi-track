import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    fullName: { type: String, require: true },
    phoneNumber: { type: Number, require: true, unique: true },
    cardNumber: { type: Number, require: true, unique: true },
    age: { type: Number, require: true },
    history: [
      {
        history: String,
        dateCreated: { type: Date, default: Date.now },
        createdBy: String,
      },
    ],
    active: { type: Boolean, default: true },
    paymentStatus: { type: Boolean },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
