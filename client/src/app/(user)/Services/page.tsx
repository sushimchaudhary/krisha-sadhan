"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Service {
  _id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const router = useRouter();

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

  const handleLearnMore = (id: string) => {
    router.push(`/Services/${id}`);
  };

  return (
    <section>
      <Toaster position="top-right" />
      <div className="container py-5">
        <div className="row text-center mb-4">
          <h2 className="fw-bold">
            Premium Land Cruiser Service & Maintenance
          </h2>
          <p className="text-muted py-3">
            Keep your Land Cruiser running in peak condition with our
            comprehensive service and maintenance solutions. Our certified
            technicians specialize in Land Cruisers, offering everything from
            routine checkups to complex repairs. Services include full engine
            diagnostics, suspension tuning, AC and heater maintenance, battery
            and chargeable system checks, and more — all using genuine parts and
            the latest technology. We also prioritize your safety with detailed
            inspections, brake servicing, and road-readiness testing. Whether
            it's comfort, performance, or reliability, we ensure your vehicle
            gets the premium care it deserves. Trust us to protect your
            investment — with safety, power, and luxury in every detail.
          </p>
        </div>

        <div className="row g-4">
          {servicesList.slice(0, 3).map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div style={{ height: "250px", overflow: "hidden" }}>
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="card-img-top w-100 h-100"
                    style={{
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{item.title}</h5>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    {item.description.length > 120
                      ? item.description.slice(0, 120) + "..."
                      : item.description}
                  </p>
                  <button
                    className="mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-4 py-2 w-34 rounded font-semibold transition"
                    onClick={() => handleLearnMore(item._id)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        {servicesList.length > 3 && (
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/allServices")}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-sm px-6 py-2 rounded font-semibold transition"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
