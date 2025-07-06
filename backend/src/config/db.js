import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.URI);
    console.log(
      `DB connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
