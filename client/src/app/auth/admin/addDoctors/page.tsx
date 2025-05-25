"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


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

const specializations = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Orthopedic",
  "Psychiatrist",
  "Dentist",
  "ENT Specialist",
];

const DoctorPage = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [education, setEducation] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
      toast.error("Could not fetch doctor list");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleAddEducation = () => {
    if (newEducation.trim()) {
      setEducation([...education, newEducation.trim()]);
      setNewEducation("");
    }
  };

  const resetForm = () => {
    setName("");
    setSpecialization("");
    setExperience("");
    setBio("");
    setEducation([]);
    setNewEducation("");
    setImage(null);
    setEditingDoctorId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !editingDoctorId) return toast.error("Please upload an image.");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("specialization", specialization);
      formData.append("experience", experience);
      formData.append("bio", bio);
      formData.append("education", education.join(","));
      if (image) formData.append("imageFile", image);

      if (editingDoctorId) {
        const res = await axios.put(
          `http://localhost:5000/api/doctors/${editingDoctorId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setDoctors((prev) =>
          prev.map((doc) => (doc._id === editingDoctorId ? res.data : doc))
        );
        toast.success("Doctor updated successfully!");
      } else {
        const res = await axios.post("http://localhost:5000/api/doctors", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setDoctors((prev) => [...prev, res.data]);
        toast.success("Doctor added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Failed to submit doctor");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      setDoctors(doctors.filter((doc) => doc._id !== id));
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      console.error("Failed to delete doctor", err);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctorId(doctor._id);
    setName(doctor.name);
    setSpecialization(doctor.specialization);
    setEducation(doctor.education);
    setExperience(doctor.experience);
    setBio(doctor.bio);
    setImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white ">
      <Toaster position="top-center" />
   

      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h1 className="text-4xl font-bold mb-10 text-center text-blue-800">
          👩‍⚕️ {editingDoctorId ? "Edit Doctor" : "Add New Doctor"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Experience (e.g., 5 years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 border border-gray-300 rounded-lg bg-white"
            required={!editingDoctorId}
          />

          <textarea
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg col-span-1 md:col-span-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="col-span-1 md:col-span-2">
            <label className="block font-semibold mb-2 text-gray-700">
              Education
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter education qualification"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                onClick={handleAddEducation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {education.map((edu, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {edu}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 col-span-1 md:col-span-2">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              {editingDoctorId ? "Update Doctor" : "Submit Doctor"}
            </Button>
            {editingDoctorId && (
              <Button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">📋 Doctors List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={`http://localhost:5000${doc.image}`}
                alt={doc.name}
                className="img-fluid doctor-img"
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
                      className="text-red-500 text-xs "
                    >
                      {edu}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={() => handleEdit(doc)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default DoctorPage;
