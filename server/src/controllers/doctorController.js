// controllers/doctorController.js
import Doctor from '../models/doctorModel.js';

// Get all doctors (Public)
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Add a new doctor (Admin only)
export const addDoctor = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  const { name, specialization, education, experience, bio } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  // Simple validation
  if (!name?.trim() || !specialization?.trim() || !education) {
    return res.status(400).json({ message: "Please provide Name, Specialization, and Education." });
  }

  try {
    const newDoctor = new Doctor({
      name,
      specialization,
      education: education.split(',').map((e) => e.trim()),
      experience,
      bio,
      image,
    });

    const saved = await newDoctor.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.status(500).json({ message: error.message || 'Failed to add doctor' });
  }
};

// Update a doctor (Admin only)
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = {
      name: req.body.name,
      specialization: req.body.specialization,
      experience: req.body.experience,
      bio: req.body.bio,
      education: req.body.education?.split(",").map(e => e.trim()) || [],
    };

    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error("Error updating doctor:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a doctor (Admin only)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
