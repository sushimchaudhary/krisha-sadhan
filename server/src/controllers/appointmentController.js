import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'done'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Status updated', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Count appointments for a specific date and hour
export const countAppointmentsByDateAndHour = async (req, res) => {
  const { date, hour } = req.query;

  if (!date || !hour) {
    return res.status(400).json({ message: 'Missing date or hour parameter' });
  }

  try {
    // Match appointments where preferredDate is the exact date
    // and preferredTime starts with the given hour, e.g. '14' matches '14:00', '14:30'
    const count = await Appointment.countDocuments({
      preferredDate: date,
      preferredTime: { $regex: `^${hour}:` },
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error counting appointments', error });
  }
};

