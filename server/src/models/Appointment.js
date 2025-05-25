// models/appointmentModel.js

import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  preferredDate: String,
  preferredTime: String,   // store as 'HH:mm'
  department: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'done', 'Cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
