import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { router } from "./routes/user.route.js";
import { accessRouter } from "./routes/access.route.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 2100;
connectDB();

app.use(cors());
app.use(express.json());
//my routes
app.use("/api/auth", router);
app.use("/api/user", accessRouter);

app.listen(PORT, () => {
  console.log(`Listenning to port: ${PORT}`);
});
