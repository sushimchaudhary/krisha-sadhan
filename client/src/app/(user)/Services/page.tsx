"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface Service {
  _id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

const AddServicesPage = () => {
  const [servicesList, setServicesList] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services/all");
      setServicesList(res.data);
    } catch (err) {
      console.error("Fetch services error", err);
      toast.error("Could not load services");
    }
  };


  return (
    <div className="bg-dark min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                  {item.description}
                </p>
                 <Link
                href={`/Services/${item._id}`}> 
              <button className="py-1 px-2 bg-primary text-white font-bold rounded">Learn more</button>
                
              </Link>
              
              </div>

             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddServicesPage;
