"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Button } from "@/components/ui/button";

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
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{item.description}</p>
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Learn More
        </a>
      </div>
    </div>
  ))}
</div>

  );
};

export default AddServicesPage;
