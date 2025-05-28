"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service", err);
      }
    };

    if (id) fetchService();
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={`http://localhost:5000${service.image}`}
        alt={service.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h1>
      <p className="text-gray-700 text-lg">{service.description}</p>
    </div>
  );
};

export default ServiceDetailPage;
