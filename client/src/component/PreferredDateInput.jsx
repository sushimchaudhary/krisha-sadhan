// component/PreferredDateInput.jsx
'use client';

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PreferredDateInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="form-label">Preferred Date</label>
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="MMMM d, yyyy" // Shows month name, day, year (e.g. May 24, 2025)
        minDate={new Date()}     // Disable past dates
        placeholderText="Select a date"
        className="form-control"
      />
    </div>
  );
};

export default PreferredDateInput;
