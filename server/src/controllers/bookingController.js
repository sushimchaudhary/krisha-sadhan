import Booking from "../models/Booking.js";

// Add new booking
export const addBooking = async (req, res) => {
  const { date, name, email } = req.body;

  try {
    const booking = new Booking({ date, name, email });
    await booking.save();
    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Date already booked" });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

// Get all booked dates
export const getBookedDates = async (req, res) => {
  try {
    const bookings = await Booking.find({}, "date");
    const bookedDates = bookings.map((b) => b.date);
    res.json(bookedDates);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch booked dates" });
  }
};
