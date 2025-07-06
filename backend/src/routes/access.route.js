import express from "express";
import {
  adminDashboard,
  nurseDashboard,
  labtechDashboard,
  regDashboard,
  doctorDashboard,
  financeDashboard,
} from "../controllers/userAccess.controller.js";
import { verifyToken } from "../middlewares/access.middleware.js";
import { authorized } from "../middlewares/position.middleware.js";
import {
  activate,
  patientReg,
  search,
  updatePatientHistory,
} from "../controllers/patient.controller.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

export const accessRouter = express.Router();

//Route accesed only by the admin
accessRouter.get("/admin", verifyToken, authorized("admin"), adminDashboard);
accessRouter.delete(
  "/admin/delete/:id",
  verifyToken,
  authorized("admin"),
  deleteUser
);
accessRouter.put(
  "/admin/update-user/:id",
  verifyToken,
  authorized("admin"),
  updateUser
);
//Routes accessed by doctors nurses and labtech
accessRouter.get(
  "/nurse",
  verifyToken,
  authorized("doctor", "nurse"),
  nurseDashboard
);
//Route accessed only by doctors
accessRouter.get("/doctor", verifyToken, authorized("doctor"), doctorDashboard);
accessRouter.put(
  "/doctor/update-history/:id",
  verifyToken,
  authorized("doctor"),
  updatePatientHistory
);
//Route accessed only by reg
accessRouter.get("/reg", verifyToken, authorized("reg"), regDashboard);
accessRouter.get("/reg/search", verifyToken, authorized("reg"), search);
accessRouter.post(
  "/reg/patient-reg",
  verifyToken,
  authorized("reg"),
  patientReg
);
accessRouter.post("/reg/activate", verifyToken, authorized("reg"), activate);
//Route accessed only by labtech
accessRouter.get(
  "/labtech",
  verifyToken,
  authorized("labtech"),
  labtechDashboard
);
//Route accessed only by finance
accessRouter.get(
  "/finance",
  verifyToken,
  authorized("finance"),
  financeDashboard
);
