import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

import upload from "../middlewares/upload.js";

const router = express.Router();

// Get all doctors
router.get("/", getAllDoctors);

// Get one doctor by id
router.get("/:id", getDoctorById);

// Create new doctor with image upload - expect field name "imageFile"
router.post("/", upload.single("imageFile"), createDoctor);

// Update doctor by id, optional image upload
router.put("/:id", upload.single("imageFile"), updateDoctor);

// Delete doctor by id
router.delete("/:id", deleteDoctor);

export default router;
