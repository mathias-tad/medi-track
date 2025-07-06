import express from "express";
import {
  register,
  login,
  resetPassword,
  sendResetOTP,
} from "../controllers/user.controller.js";
export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/sendotp", sendResetOTP);
