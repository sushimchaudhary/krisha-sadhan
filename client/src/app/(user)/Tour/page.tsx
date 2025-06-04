// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// import Link from "next/link";

// interface Doctor {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number;
//   image: string;
//   education: string[];
// }

// const DoctorPage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/doctors");
//       setDoctors(res.data);
//     } catch (err) {
//       console.error("Failed to fetch doctors", err);
//       toast.error("Could not fetch doctor list");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b  to-white">
//       <Toaster position="top-center" />
//       <main className="max-w-7xl mx-auto  px-4 py-10 flex-grow">
//         <h2 className="text-3xl font-semibold mb-6 text-center  text-gray-800">
//           📋 Our Tours List
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-8">
//           {doctors.map((doc) => (
//             <div
//               key={doc._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
//             >
//               <img
//                 src={`http://localhost:5000${doc.image}`}
//                 alt={doc.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-1 flex flex-col flex-grow">
//                 <h3 className="text-xl font-semibold text-gray-900">{doc.title}</h3>
//                 <span className="text-sm text-gray-500">{doc.duration}</span>
//                 <p className="text-green-600 font-bold mt-1">NPR {doc.price}</p>
//                 <p className="text-sm text-gray-700 line-clamp-3">{doc.description}</p>
//                 <div className="gap-1 mt-2">
//                   {doc.education.map((edu, index) => (
//                     <div key={`edu-${doc._id}-${index}`} className="text-red-500  font-bold">
//                       {edu}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-3">
//                   <Link
//                     href={`/Tour/${doc._id}`}
//                     className="inline-block  text-decoration-none bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md font-semibold transition"
//                   >
//                     Lear More
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorPage;




// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// interface Doctor {
//   _id: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: number;
//   image: string;
//   education: string[];
// }

// const DoctorPage = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/doctors");
//         setDoctors(res.data);
//       } catch (err) {
//         console.error("Failed to fetch doctors", err);
//         toast.error("Could not fetch doctor list");
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const visibleDoctors = doctors.slice(0, 4);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
//       <Toaster position="top-center" />

//       <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
//         <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
//           📋 Our Tours List
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {visibleDoctors.map((doc) => (
//             /* ------------- CARD (clicks to /Tour/[id]) ------------- */
//             <div
//               key={doc._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer flex flex-col"
//               onClick={() => router.push(`/Tour/${doc._id}`)}
//             >
//               <img
//                 src={`http://localhost:5000${doc.image}`}
//                 alt={doc.title}
//                 className="w-full h-48 object-cover"
//               />

//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {doc.title}
//                 </h3>
//                 <span className="text-sm text-gray-500">{doc.duration}</span>
//                 <p className="text-green-600 font-bold mt-1">NPR {doc.price}</p>
//                 <p className="text-sm text-gray-700 line-clamp-3 flex-grow">
//                   {doc.description}
//                 </p>

//                 <div className="gap-1 mb-2">
//                   {doc.education.map((edu, i) => (
//                     <div
//                       key={`edu-${doc._id}-${i}`}
//                       className="text-red-500 font-bold"
//                     >
//                       {edu}
//                     </div>
//                   ))}
//                 </div>

//                 {/* ---------------- Book Now button ---------------- */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     router.push(
//                       `/Appointment?title=${encodeURIComponent(
//                         doc.title
//                       )}&price=${doc.price}&id=${doc._id}`
//                     );
//                   }}
//                   className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 w-32 rounded-md font-semibold transition"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Button */}
//         {doctors.length > 4 && (
//           <div className="text-center py-6">
//             <button
//               onClick={() => router.push("/AllTours")}
//               className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow-sm transition"
//             >
//               View All Tours
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default DoctorPage;





"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Doctor {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  education: string[];
  location: string;  // नयाँ: स्थान
}

const DoctorPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
        toast.error("Could not fetch doctor list");
      }
    };

    fetchDoctors();
  }, []);

  const visibleDoctors = doctors.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Toaster position="top-center" />

      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          📋 Our Tours List
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer flex flex-col"
              onClick={() => router.push(`/Tour/${doc._id}`)}
            >
              <img
                src={`http://localhost:5000${doc.image}`}
                alt={doc.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900">
                  {doc.title}
                </h3>
                <span className="text-sm text-gray-500">{doc.duration}</span>
                <p className="text-green-600 font-bold mt-1">NPR {doc.price}</p>
                <p className="text-sm text-gray-700 line-clamp-3 flex-grow">
                  {doc.description}
                </p>

                <div className="gap-1 mb-2">
                  {doc.education.map((edu, i) => (
                    <div
                      key={`edu-${doc._id}-${i}`}
                      className="text-red-500 font-bold"
                    >
                      {edu}
                    </div>
                  ))}
                </div>

                {/* Book Now बटन: location समेत पठाउने */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/Appointment?title=${encodeURIComponent(
                        doc.title
                      )}&price=${doc.price}&id=${doc._id}&location=${encodeURIComponent(doc.title)}`
                    );
                  }}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 w-32 rounded font-semibold transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {doctors.length > 4 && (
          <div className="text-center py-6">
            <button
              onClick={() => router.push("/AllTours")}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded shadow-sm transition"
            >
              View All Tours
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPage;
