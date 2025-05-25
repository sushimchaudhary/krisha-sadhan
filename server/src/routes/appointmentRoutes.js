import express from 'express';
import {
  countAppointmentsByDateAndHour,
  createAppointment,
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);
router.delete('/:id', deleteAppointment);
router.patch('/:id/status', updateAppointmentStatus); 
router.get('/count', countAppointmentsByDateAndHour);

export default router;
