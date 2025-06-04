import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // location: { type: String }, // if you want to use it later
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  education: { type: [String], default: [] }, // array of strings
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
