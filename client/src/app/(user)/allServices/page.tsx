// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Link from "next/link";

// interface Service {
//   _id: string;
//   image: string;
//   title: string;
//   description: string;
//   link: string;
// }

// const AddServicesPage = () => {
//   const [servicesList, setServicesList] = useState<Service[]>([]);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/services/all");
//       setServicesList(res.data);
//     } catch (err) {
//       console.error("Fetch services error", err);
//       toast.error("Could not load services");
//     }
//   };

//   return (
//     <div className=" min-h-screen bg-gray-100 p-6">
//       <Toaster position="top-right" />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {servicesList.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
//           >
//             <img
//               src={`http://localhost:5000${item.image}`}
//               alt={item.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5 flex flex-col justify-between h-full">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
//                 <p className="text-sm text-gray-700 mt-2 line-clamp-3">
//                   {item.description}
//                 </p>
//                  <Link
//                 href={`/Services/${item._id}`}>
//               <button className="py-1 px-2 bg-primary text-white font-bold rounded">Learn more</button>

//               </Link>

//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddServicesPage;

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
          <h2 className=" fw-bold">
            {" "}
            Premium Land Cruiser Service & Maintenance
          </h2>
          <p className="text-muted py-3">
            Experience exceptional care for your Land Cruiser with our
            dedicated, expert-level service. Engineered for precision and
            reliability, our maintenance approach is tailored specifically to
            meet the demands of your vehicle. From the moment you arrive, our
            certified technicians take a meticulous approach—utilizing advanced
            diagnostics and only genuine Toyota parts—to ensure that every
            component performs exactly as it should. Whether you're conquering
            rugged terrains or cruising through city streets, we maintain the
            legendary power, comfort, and durability that define the Land
            Cruiser legacy. Trust us to preserve your vehicle’s excellence, mile
            after mile.
          </p>
        </div>
        <div className="row g-4">
          {servicesList.map((item) => (
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
      </div>
    </section>
  );
};

export default ServicesPage;
