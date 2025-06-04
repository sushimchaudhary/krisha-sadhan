import Doctor from "../models/tourModel.js";
import path from "path";
import fs from "fs";

// CREATE
export const createDoctor = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imagePath = "/uploads/" + req.file.filename;

    const newDoctor = new Doctor({
      title,
      description,
      duration,
      price,
      image: imagePath,
      education: req.body.education || [],
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    console.error("Error creating tour:", err);
    res.status(500).json({ error: "Failed to create tour" });
  }
};

// GET ALL
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tours" });
  }
};

// GET BY ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Tour not found" });

    const updates = {
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      price: req.body.price,
      education: req.body.education || [],
    };

    if (req.file) {
      // Delete old image
      if (doctor.image) {
        const oldPath = path.join("public", doctor.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updates.image = "/uploads/" + req.file.filename;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedDoctor);
  } catch (err) {
    console.error("Error updating tour:", err);
    res.status(500).json({ error: "Failed to update tour" });
  }
};

// DELETE
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: "Tour not found" });

    if (doctor.image) {
      const imagePath = path.join("public", doctor.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Doctor.findByIdAndDelete(id);
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete tour" });
  }
};
