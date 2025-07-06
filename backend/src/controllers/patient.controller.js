import { Patient } from "../models/patient.model.js";

export const patientReg = async (req, res) => {
  const { fullName, phoneNumber, age } = req.body;

  if (fullName && phoneNumber && age) {
    try {
      const newPatient = new Patient({
        fullName,
        phoneNumber,
        cardNumber: Date.now(),
        age,
        paymentStatus: false,
        active: false,
      });
      await newPatient.save();
      res.status(201).json({ message: "Patient registered successfuly" });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong please try again later!!!",
      });
      console.log(err);
    }
  }
};

export const activate = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (id) {
    try {
      await Patient.findByIdAndUpdate(
        id,
        { $set: { active: true } },
        { new: true }
      );
      res.status(201).json({ message: "Patient Activated" });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong please try again later!!!",
      });
      console.log(err);
    }
  }
};

export const search = async (req, res) => {
  const { phoneNumber } = req.query;
  const { fullName } = req.query;

  if (phoneNumber) {
    try {
      const patientFound = await Patient.find(
        { phoneNumber: phoneNumber },
        "-history -__v"
      );
      if (!patientFound)
        res.status(404).json({ message: "No data found with this number" });
      res.json(patientFound);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong please try again later!!!",
      });
      console.log(error);
    }
  } else if (fullName) {
    try {
      const regex = new RegExp(fullName, "i");
      const patientFound = await Patient.find(
        { fullName: regex },
        "-history -__v"
      );
      if (!patientFound)
        return res
          .status(404)
          .json({ message: "No data found with this name" });
      return res.json(patientFound);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong please try again later!!!",
      });
    }
  }
};

export const updatePatientHistory = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { $push: { history: req.body } },
      { new: true }
    );
    return res.status(201).json({ message: `${req.params.id}`, data: updated });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to Update patient history" });
  }
};
