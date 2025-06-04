// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import PreferredDateInput from "../../../component/PreferredDateInput"; // तपाईँको कस्टम डेट पिकर कम्पोनेन्ट
// import { FaArrowRightLong } from "react-icons/fa6";

// const AppointmentPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     preferredDate: "",   // backend अनुसार नाम मिलाउनुहोस्
//     preferredTime: "",   // backend अनुसार नाम मिलाउनुहोस्
//     message: "",
//     maxGroup: "",    // new field for max group size
//   location: "",    // new field for location

//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prev) => ({ ...prev, preferredDate: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // सबै अनिवार्य फिल्डहरु खाली छैनन् भनी चेक
//     if (
//       !formData.fullName ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.preferredDate ||
//       !formData.preferredTime
//     ) {
//       toast.error("Please fill in all required fields!");
//       return;
//     }

//     try {
//       const hour = formData.preferredTime.split(":")[0]; // "HH:mm" बाट घण्टा निकाल्नुहोस्

//       // backend endpoint URL सँग मिलाएर प्रयोग गर्नुहोस्
//       const { data } = await axios.get(
//         `http://localhost:5000/api/appointments/count?date=${formData.preferredDate}&hour=${hour}`
//       );

//       if (data.count >= 10) {
//         toast.error(
//           "The selected time slot is fully booked. Please choose a different time.",
//           { duration: 10000 }
//         );
//         return;
//       }

//       await axios.post("http://localhost:5000/api/appointments", formData);
//       toast.success("Appointment booked successfully!");

//       // फॉर्म रिसेट गर्नुहोस्
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         preferredDate: "",
//         preferredTime: "",
//         message: "",
//       });
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message ||
//           "Booking failed. Please check your details and try again."
//       );
//     }
//   };

//   return (
//     <section className="py-4">
//       <Toaster position="top-right" />
//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6">
//               <p className="text-danger font-semibold">Start Your Journey</p>
//               <h3 className="fw-bold">Schedule Your Land Cruiser Tour</h3>
//               <div className="row">
//                 <div className="col-lg-6 mb-3">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     className="form-control"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-lg-6 mb-3">
//                   <label className="form-label">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-lg-6 mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     className="form-control"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-lg-6 mb-3">
//                   <PreferredDateInput
//                     value={formData.preferredDate}
//                     onChange={handleDateChange}
//                   />
//                 </div>

//                 <div className="col-lg-6 mb-3">
//                   <label className="form-label">Pick-Up Time</label>
//                   <select
//                     name="preferredTime"
//                     className="form-control"
//                     value={formData.preferredTime}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Time</option>
//                     <option value="08:00">8:00 AM</option>
//                     <option value="09:00">9:00 AM</option>
//                     <option value="10:00">10:00 AM</option>
//                     <option value="11:00">11:00 AM</option>
//                     <option value="12:00">12:00 PM</option>
//                     <option value="13:00">1:00 PM</option>
//                     <option value="14:00">2:00 PM</option>
//                     <option value="15:00">3:00 PM</option>
//                     <option value="16:00">4:00 PM</option>
//                     <option value="17:00">5:00 PM</option>
//                     <option value="18:00">6:00 PM</option>
//                     <option value="19:00">7:00 PM</option>
//                     <option value="20:00">8:00 PM</option>
//                   </select>
//                 </div>

//                 <div className="col-12 mb-3">
//                   <label className="form-label">Message (Optional)</label>
//                   <textarea
//                     className="form-control"
//                     name="message"
//                     rows={3}
//                     value={formData.message}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 d-flex justify-content-center ">
//                   <button
//                     type="submit"
//                     className="bg-red-500 text-white d-flex align-items-center w-50 gap-2 px-4 py-2 rounded transition"
//                     style={{
//                       borderRadius: "0.5rem",
//                       fontWeight: "bold",
//                       fontSize: "1rem",
//                       boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
//                       transition: "all 0.3s ease-in-out",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-2px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 6px 16px rgba(0, 123, 255, 0.3)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 12px rgba(0, 123, 255, 0.2)";
//                     }}
//                   >
//                     <span className="text-white">Book Now</span>
//                     <FaArrowRightLong
//                       style={{ fontSize: "1.2rem", color: "white" }}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 shadow">
//               <img
//                 className="w-100"
//                 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
//                 alt="Hospital"
//               />
//               <h4 className="fw-bold py-3">Working Hours</h4>
//               <div className="row">
//                 <hr />
//                 <div className="col-6">
//                   <h6 className="text-success">Emergency Services</h6>
//                 </div>
//                 <div className="col-6 text-end">
//                   <h6 className="text-success">24/7</h6>
//                 </div>
//                 <hr />
//                 <div className="col-12 mt-3">
//                   <h6>Need Help?</h6>
//                   <p>For any queries or emergencies, please call:</p>
//                   <h5 className="text-primary">+977 98xxxxxxxxx</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default AppointmentPage;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PreferredDateInput from "../../../component/PreferredDateInput"; // तपाईँको कस्टम डेट पिकर कम्पोनेन्ट
import { FaArrowRightLong } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "", // backend अनुसार नाम मिलाउनुहोस्
    preferredTime: "", // backend अनुसार नाम मिलाउनुहोस्
    message: "",
    maxGroup: "", // नयाँ फिल्ड: अधिकतम समूह साइज
    userLocation: "",
    tourLocation: "",
  });

  const searchParams = useSearchParams();

  // Auto-fill tourLocation from query string on mount
  useEffect(() => {
    const loc = searchParams.get("location"); // ?location=Kathmandu
    if (loc) {
      setFormData((prev) => ({ ...prev, tourLocation: loc }));
    }
  }, [searchParams]);

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // केवल अंक मात्र, १० अङ्कसम्म, र "97" वा "98" बाट सुरु हुने
      if (/^(97|98)?\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, preferredDate: date }));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^9[78]\d{8}$/.test(formData.phone)) {
      toast.error(
        "Phone number must start with 97 or 98 and be 10 digits long."
      );
      return;
    }

    // सबै अनिवार्य फिल्डहरु खाली छैनन् भनी चेक
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredDate ||
      !formData.preferredTime ||
      !formData.maxGroup ||
      !formData.userLocation ||
      !formData.tourLocation
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // maxGroup को मान 1 देखि 7 को बीचमा छ कि छैन जाँच
    const maxGroupNum = Number(formData.maxGroup);
    if (maxGroupNum < 1 || maxGroupNum > 7) {
      toast.error("Max group size must be between 1 and 7");
      return;
    }

    try {
      const hour = formData.preferredTime.split(":")[0]; // "HH:mm" बाट घण्टा निकाल्नुहोस्

      // backend endpoint URL सँग मिलाएर प्रयोग गर्नुहोस्
      const { data } = await axios.get(
        `http://localhost:5000/api/appointments/count?date=${formData.preferredDate}&hour=${hour}`
      );

      if (data.count >= 10) {
        toast.error(
          "The selected time slot is fully booked. Please choose a different time.",
          { duration: 10000 }
        );
        return;
      }

      await axios.post("http://localhost:5000/api/appointments", formData);
      toast.success("Appointment booked successfully!");

      // फॉर्म रिसेट गर्नुहोस्
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
        maxGroup: "",
        userLocation: "",
        tourLocation: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Booking failed. Please check your details and try again."
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
              <p className="text-red-500 font-semibold">Start Your Journey</p>
              <h3 className="fw-bold">Schedule Your Land Cruiser Tour</h3>
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

                {/* Your Location field */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Your Location</label>
                  <input
                    type="text"
                    name="userLocation"
                    className="form-control"
                    value={formData.userLocation}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    required
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
                    maxLength={10}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <PreferredDateInput
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <label className="form-label">Pick-Up Time</label>
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
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>

                {/* Max Group Size field */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Max Group Size</label>
                  <input
                    type="number"
                    name="maxGroup"
                    min={1}
                    max={7}
                    className="form-control"
                    value={formData.maxGroup}
                    onChange={handleChange}
                    placeholder="Enter max group size (up to 7)"
                  />
                </div>

                {/* Tour Location field */}
                <div className="col-lg-6 mb-3">
                  <label className="form-label">Tour Location</label>
                  <input
                    type="text"
                    name="tourLocation"
                    className="form-control"
                    value={formData.tourLocation}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
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
                    type="submit"
                    className="bg-red-500 text-white d-flex align-items-center w-50 gap-2 px-4 py-2 rounded transition"
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
                    <span className="text-white">Book Now</span>
                    <FaArrowRightLong
                      style={{ fontSize: "1.2rem", color: "white" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 shadow">
              <img className="w-100 rounded-2xl" src="/1.jpg" alt="Hospital" />

              <div className="row m-2">
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
                  <h5 className="text-primary">+977 98xxxxxxxxx</h5>
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
