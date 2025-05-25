"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  education: string[];
  experience: string;
  bio: string;
  image: string;
}

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        👨‍⚕️ Meet Our Doctors
      </h2>
       <p className="mb-5 text-center">
         Our team of dedicated healthcare professionals committed to providing you with exceptional care.
        </p>

      <div className="row gap-4">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="col-12 col-sm-6 col-lg-3 rounded Card shadow-lg"
          >
            <div className="card1 Doctors_card">
            <img
              src={`http://localhost:5000${doc.image}`}
              alt={doc.name}
              className="img-fluid doctor-img py-2 rounded-2xl"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900">{doc.name}</h3>
              <span className="text-blue-600 font-medium">{doc.specialization}</span>
              <span className="text-sm text-gray-500">{doc.experience}</span>
              <p className="text-sm text-gray-700 mt-1 line-clamp-3">{doc.bio}</p>

              <div className="gap-2 ">
                {doc.education.map((edu, index) => (
                  <div
                    key={`edu-${doc._id}-${index}`}
                    className="text-red-500 text-xs"
                  >
                    {edu}
                  </div>
                ))}
              </div>

              <Link href={`/doctors/${doc._id}`} className="mt-4">
                <Button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition">
                  Learn More
                </Button>
              </Link>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
