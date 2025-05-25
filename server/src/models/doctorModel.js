import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  education: { type: [String], default: [] },
  experience: { type: String },
  bio: { type: String },
  image: { type: String }, // store image path here (e.g. /uploads/filename.jpg)
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
