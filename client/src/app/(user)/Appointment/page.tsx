"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PreferredDateInput from "../../../component/PreferredDateInput";
import { FaArrowRightLong } from "react-icons/fa6";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: null,
    preferredTime: "", // added time field
    department: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredDate ||
      !formData.preferredTime || // validate time
      !formData.department
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const date = formData.preferredDate.toLocaleDateString("en-CA"); // format YYYY-MM-DD
      const hour = formData.preferredTime.split(":")[0]; // get hour from "HH:mm"

      // Check appointment count for date and hour
      const { data } = await axios.get(
        `http://localhost:5000/api/appointments/count?date=${date}&hour=${hour}`
      );

      if (data.count >= 10) {
        toast.error(
          "The selected time slot is fully booked. Please choose a different time.",
          {
            duration: 10000,
          }
        );
        return;
      }

      const appointmentData = {
        ...formData,
        preferredDate: date,
      };

      await axios.post(
        "http://localhost:5000/api/appointments",
        appointmentData
      );
      toast.success("Appointment booked successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: null,
        preferredTime: "",
        department: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to book appointment!"
      );
    }
  };

  return (
    <section className="py-4">
      <Toaster position="top-right" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <p className="text-primary">Book an Appointment</p>
              <h3 className="fw-bold">Schedule Your Visit</h3>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <PreferredDateInput
                    value={formData.preferredDate}
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, preferredDate: date }))
                    }
                  />
                </div>

                {/* New Time Select */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Preferred Time</label>
                  <select
                    name="preferredTime"
                    className="form-control"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    <option value="">Select Time</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Department</label>
                  <input
                    className="form-control"
                    list="departments"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Select Department"
                  />
                  <datalist id="departments">
                    <option value="Cardiology" />
                    <option value="Neurology" />
                    <option value="Pediatrics" />
                    <option value="Orthopedics" />
                    <option value="General Surgery" />
                  </datalist>
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">Message (Optional)</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-center ">
                  <button
                    className="btn btn-primary d-flex align-items-center w-100 gap-2 px-4 py-2"
                    style={{
                      borderRadius: "0.5rem",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 16px rgba(0, 123, 255, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 123, 255, 0.2)";
                    }}
                  >
                    <span className="text-white">Book Appointment</span>
                    <FaArrowRightLong
                      style={{ fontSize: "1.2rem", color: "white" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 shadow">
              <img
                className="w-100"
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
                alt="Hospital"
              />
              <h4 className="fw-bold py-3">Working Hours</h4>
              <div className="row">
                <div className="col-6">
                  <h6>Monday - Friday</h6>
                </div>
                <div className="col-6 text-end">
                  <h6>8:00 AM - 8:00 PM</h6>
                </div>
                <hr />
                <div className="col-6">
                  <h6>Saturday</h6>
                </div>
                <div className="col-6 text-end">
                  <h6>9:00 AM - 6:00 PM</h6>
                </div>
                <hr />
                <div className="col-6">
                  <h6>Sunday</h6>
                </div>
                <div className="col-6 text-end">
                  <h6>10:00 AM - 4:00 PM</h6>
                </div>
                <hr />
                <div className="col-6">
                  <h6 className="text-success">Emergency Services</h6>
                </div>
                <div className="col-6 text-end">
                  <h6 className="text-success">24/7</h6>
                </div>
                <hr />
                <div className="col-12 mt-3">
                  <h6>Need Help?</h6>
                  <p>For any queries or emergencies, please call:</p>
                  <h5 className="text-primary">+977 9812345678</h5>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AppointmentPage;
