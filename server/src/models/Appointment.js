import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: {
      type: String, // or Date if you want to store actual Date objects
      required: true,
    },
    preferredTime: {
      type: String, // e.g. "08:00", "13:00"
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    maxGroup: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    userLocation: {
      type: String,
      required: true,
      trim: true,
    },
    tourLocation: {
      type: String,
      required: true,
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
