// // component/PreferredDateInput.jsx
// 'use client';

// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const PreferredDateInput = ({ value, onChange }) => {
//   return (
//     <div>
//       <label className="form-label">Preferred Date</label>
//       <DatePicker
//         selected={value}
//         onChange={onChange}
//         dateFormat="MMMM d, yyyy" // Shows month name, day, year (e.g. May 24, 2025)
//         minDate={new Date()}     // Disable past dates
//         placeholderText="Select a date"
//         className="form-control w-64"
//       />
//     </div>
//   );
// };

// export default PreferredDateInput;




'use client';

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface PreferredDateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const PreferredDateInput: React.FC<PreferredDateInputProps> = ({ value, onChange }) => {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/booked-dates");
        const dates = response.data.map((dateStr: string) => new Date(dateStr));
        setBookedDates(dates);
      } catch (error) {
        console.error("Error fetching booked dates:", error);
        toast.error("Failed to load booked dates");
      }
    };

    fetchBookedDates();
  }, []);

  // If value is already booked, clear it and notify user
  useEffect(() => {
    if (value) {
      const isBooked = bookedDates.some(
        (d) => d.toDateString() === value.toDateString()
      );
      if (isBooked) {
        toast.error("Selected date is already booked. Clearing selection.");
        onChange(null);
      }
    }
  }, [value, bookedDates, onChange]);

  const handleChange = (date: Date | null) => {
    if (date) {
      const isBooked = bookedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      if (isBooked) {
        toast.error("This date is already booked. Please choose another date.");
        return;
      }
    }
    onChange(date);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
      <DatePicker
        selected={value}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy"
        minDate={new Date()}
        excludeDates={bookedDates}
        placeholderText="Select a date"
        className="w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default PreferredDateInput;
