import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../config/mailer.js";

export const register = async (req, res) => {
  const { username, password, email, position } = req.body;
  //console.log(req.body);
  if (username && password && email && position) {
    try {
      const hashedPass = await bcrypt.hash(password, 9);
      const newUser = new User({
        username,
        password: hashedPass,
        email,
        position,
      });
      await newUser.save();
      //Wellcomming the new user
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Wellcome to MediTrack",
        text: `Your user account has been created as ${position} position with a \nusername: ${username}\npassword: ${password}\nplease don't forget to change your password by clicking "forgot password" in login page`,
      };
      await transporter.sendMail(mailOptions);
      res.status(201).json({ message: `User created as a: ${position}` });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong please try again later!!!" });
      console.log(err);
    }
  } else
    res
      .status(400)
      .json({ message: "Please fill all filds with an approprate data" });
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);
  let userFound = {};
  if (username && password) {
    try {
      userFound = await User.findOne({ username });
      if (!userFound)
        return res
          .status(404)
          .json({ message: "User not found contact the admin" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong please try again!!!" });
    }

    const passMatched = await bcrypt.compare(password, userFound.password);
    if (!passMatched)
      return res.status(400).json({ message: "Incorect password" });
    const token = jwt.sign(
      {
        id: userFound._id,
        username: userFound.username,
        position: userFound.position,
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" }
    );
    res.status(200).json({ token });
  } else return res.json({ success: false, message: "Missing info" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await User.findByIdAndDelete(id);
      res.status(201).json({ message: "User deleted successfuly" });
    } catch (error) {
      res.status(400).json({ message: "Can not delete the user" });
      console.log(error);
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch (error) {
    res.status(400).json({ message: "Failed to Update user" });
    console.log(error);
  }
};

// Send password reset OTP
export const sendResetOTP = async (req, res) => {
  const { username } = req.body;
  if (!username)
    return res.json({ success: false, message: "Username is required" });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        success: false,
        message: "No user found with this username",
      });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOTP = otp;
    user.resetOTPExpiresAt = Date.now() + 3 * 60 * 1000;

    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your OTP for password reset is ${otp} this OTP will expire after 3 minutes`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

// Reset user password

export const resetPassword = async (req, res) => {
  const { username, resetOTP, newPassword } = req.body;

  if (!username || !resetOTP || !newPassword)
    return res.json({
      success: false,
      message: "username, OTP and new Password are required",
    });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false, message: "user not found" });
    if (user.resetOTP === "" || user.resetOTP !== resetOTP)
      return res.json({ success: false, message: "Invalid OTP" });
    if (user.resetOTPExpiresAt < Date.now())
      return res.json({ success: false, message: "OTP has expired" });

    const hashedPass = await bcrypt.hash(newPassword, 9);
    user.password = hashedPass;
    user.resetOTP = "";
    user.resetOTPExpiresAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Your password has been reseted successfuly",
    });
  } catch (error) {
    return res.json({ success: false, message: "Something went wrong" });
  }
};
