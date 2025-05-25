"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  education: string[];
  experience: string;
  bio: string;
  image: string;
}

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to fetch doctor details", err);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  if (!doctor) return <div className="text-center py-20">Loading doctor details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-12 shadow-lg rounded-xl">
      <img
        src={`http://localhost:5000${doctor.image}`}
        alt={doctor.name}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-blue-800">{doctor.name}</h1>
      <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
      <p className="text-gray-500">{doctor.experience}</p>
      <p className="text-gray-800 mt-4">{doctor.bio}</p>

      <h3 className="mt-6 font-semibold text-gray-700">Education:</h3>
      <ul className="list-disc list-inside text-red-500">
        {doctor.education.map((edu, index) => (
          <li key={index}>{edu}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDetails;
