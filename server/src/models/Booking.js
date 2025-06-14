import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // One booking per date
  },
  name: String,
  email: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
