import { Patient } from "../models/patient.model.js";
import { User } from "../models/user.model.js";

export const adminDashboard = async (req, res) => {
  try {
    const usersFound = await User.find(
      { position: { $ne: "admin" } },
      "-password -__v"
    );
    res.json(usersFound);
  } catch (error) {
    res.status(500).json({ message: "Failed to find data" });
  }
};
export const nurseDashboard = async (req, res) => {
  try {
    const patientFound = await Patient.find({ active: { $ne: false } }, "-__v");
    res.json(patientFound);
  } catch (error) {
    res.status(500).json({ message: "Failed to find data" });
    console.log(error);
  }
};
export const labtechDashboard = async (req, res) => {
  res.json({ message: "Hello labtech" });
};
export const regDashboard = async (req, res) => {
  try {
    const patientFound = await Patient.find(
      { active: { $ne: false } },
      "-history -__v"
    );
    res.json(patientFound);
  } catch (error) {
    res.status(500).json({ message: "Failed to find data" });
    console.log(error);
  }
};
export const doctorDashboard = async (req, res) => {
  try {
    const patientFound = await Patient.find({ active: { $ne: false } }, "-__v");
    res.json(patientFound);
  } catch (error) {
    res.status(500).json({ message: "Failed to find data" });
    console.log(error);
  }
};
export const financeDashboard = async (req, res) => {
  res.json({ message: "Hello Doc" });
};
