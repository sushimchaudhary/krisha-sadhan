import express from 'express';
import multer from 'multer';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import Doctor from '../models/doctorModel.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', getDoctors);
router.post('/', upload.single('imageFile'), addDoctor);
router.delete("/:id", deleteDoctor);
router.put("/:id", upload.single("imageFile"), updateDoctor);

// Correct route for fetching doctor by id:
router.get("/doctors/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;