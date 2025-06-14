import express from 'express';
import { addBooking, getBookedDates } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/add', addBooking);
router.get('/booked-dates', getBookedDates);

export default router;
