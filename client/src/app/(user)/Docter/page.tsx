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
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-4">
        👨‍⚕️ Meet Our Doctors
      </h2>
      <p className="mb-10 text-center text-gray-600">
        Our team of dedicated healthcare professionals is committed to providing
        you with exceptional care.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
          >
            <div className="w-full h-56 overflow-hidden rounded-xl mb-4">
              <img
                src={`http://localhost:5000${doc.image}`}
                alt={doc.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="card-body flex flex-col">
              <h3 className="card-title text-xl font-semibold text-gray-900">
                {doc.name}
              </h3>
              <p className="text-blue-600 font-medium">{doc.specialization}</p>
              <p className="text-sm text-gray-500">{doc.experience}</p>
              <p className="card-text text-sm text-gray-700 mt-2 line-clamp-3">
                {doc.bio}
              </p>

              <div className="mt-2 space-y-1">
                {doc.education.map((edu, index) => (
                  <div
                    key={`edu-${doc._id}-${index}`}
                    className="text-red-500 text-xs"
                  >
                    🎓 {edu}
                  </div>
                ))}
              </div>

              <Link href={`/doctors/${doc._id}`} className="mt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-lg transition">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
