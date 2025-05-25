import Doctor from '../models/doctorModel.js';
import Appointment from '../models/Appointment.js';
import Auth from '../models/authModel.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await Auth.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.status(200).json({ totalUsers, totalDoctors, totalAppointments });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ message: 'Failed to get stats' });
  }
};
