import Tour from '../models/tourModel.js';
import Appointment from '../models/Appointment.js';
import Auth from '../models/authModel.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await Auth.countDocuments();
    const totalTours = await Tour.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.status(200).json({ totalUsers, totalTours, totalAppointments });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({ message: 'Failed to get stats' });
  }
};
