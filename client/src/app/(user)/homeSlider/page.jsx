// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Link from "next/link";

// // You can replace these icons with any icon library you prefer (e.g., react-icons, fontawesome, etc.)
// const SoundIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     width="24"
//     height="24"
//   >
//     <path d="M5 9v6h4l5 5V4L9 9H5z" />
//   </svg>
// );

// const MuteIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     viewBox="0 0 24 24"
//     width="24"
//     height="24"
//   >
//     <path d="M16.5 12l4.5 4.5-1.5 1.5L15 13.5l-4.5 4.5H5v-6H3v-3h2V7.5h4.5l6-6v7.5l2.5-2.5 1.5 1.5L16.5 12z" />
//   </svg>
// );

// const HomeSlider = () => {
//   const [media, setMedia] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [muted, setMuted] = useState(true); // start muted for autoplay rules

//   const videoRef = React.useRef(null);

//   useEffect(() => {
//     async function fetchMedia() {
//       try {
//         const res = await fetch("http://localhost:5000/api/image/all");
//         const data = await res.json();
//         setMedia(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch media:", error);
//         setLoading(false);
//       }
//     }
//     fetchMedia();
//   }, []);

//   useEffect(() => {
//     if (media.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [media]);

//   const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
//   const isImage = (url) => /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url);


//   useEffect(() => {
//     if (media.length === 0) return;
//     const currentMedia = media[current];
//     if (isVideo(currentMedia.imageUrl)) {
//       if (videoRef.current) {
//         videoRef.current.muted = muted;
//         if (!muted) videoRef.current.play().catch(() => {});
//       }
//     }
//   }, [current, muted, media]);

//   if (loading) return <p className="text-center py-10">Loading media...</p>;
//   if (media.length === 0)
//     return <p className="text-center py-10">No media found</p>;

//   return (
//     <section
//       className="home-slider position-relative"
//       style={{ height: "100vh", width: "100vw" }}
//     >
//       {/* Mute/Unmute Toggle Button at right-Left */}
//       <button
//         onClick={() => setMuted(!muted)}
//         className="btn btn-light position-absolute d-flex align-items-center justify-content-center"
//         style={{
//           top: "20px",
//           right: "20px",
//           zIndex: 30,
//           width: "44px",
//           height: "44px",
//           borderRadius: "50%",
//           opacity: 0.8,
//           padding: 0,
//           cursor: "pointer",
//         }}
//         aria-label={muted ? "Unmute video" : "Mute video"}
//         title={muted ? "Unmute video" : "Mute video"}
//       >
//         {muted ? <MuteIcon color="red" /> : <SoundIcon color="blue" />}
//       </button>

//       {/* Text Overlay */}
//       <div
//         className="position-absolute text-white p-4"
//         style={{
//           top: "50%",
//           left: "50px",
//           transform: "translateY(-50%)",
//           maxWidth: "40%",
//           zIndex: 10,
//           borderRadius: "8px",
//         }}
//       >
//         <p className="text-uppercase small fw-bold mb-2">
//           Welcome to Land Cruiser Experience
//         </p>
//         <h1 className="display-5 fw-bold">
//           Adventure meets luxury — the road is yours to rule.
//         </h1>
//         <p className="mt-3 mb-4 fw-bold">
//           The Land Cruiser is more than just a vehicle. It’s a symbol of power,
//           reliability, and comfort. Whether you're exploring rugged mountains,
//           remote trails, or cityscapes, it’s not just a drive — it's a journey
//           of confidence, class, and unforgettable memories.
//         </p>
//         <Link href="/Appointment">
//           <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded text-lg">
//             Book An Appointment
//           </button>
//         </Link>
//       </div>

//       {/* Media Background */}
//       <div
//         className="slider-image position-absolute top-0 start-0 w-100 h-100"
//         style={{ zIndex: 1, overflow: "hidden" }}
//       >
//         {isVideo(media[current]?.imageUrl) ? (
//           <video
//             ref={videoRef}
//             src={media[current].imageUrl}
//             autoPlay
//             muted={muted}
//             loop
//             className="w-100 h-100 object-cover"
//             style={{ filter: "brightness(0.7)", objectFit: "cover" }}
//             playsInline
//             controls={false}
//           />
//         ) : (
//           <div
//             style={{
//               backgroundImage: `url(${media[current].imageUrl})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               height: "100vh",
//               width: "100%",
//               filter: "brightness(0.7)",
//               transition: "background-image 0.8s ease-in-out",
//             }}  
//           />
//         )}
//       </div>

      
//     </section>
//   );
// };

// export default HomeSlider;


"use client";
import React, { useEffect, useState, useRef } from "react";

import { motion } from "framer-motion";
import Link from "next/link";

// Sound Icons
const SoundIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M5 9v6h4l5 5V4L9 9H5z" />
  </svg>
);

const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M16.5 12l4.5 4.5-1.5 1.5L15 13.5l-4.5 4.5H5v-6H3v-3h2V7.5h4.5l6-6v7.5l2.5-2.5 1.5 1.5L16.5 12z" />
  </svg>
);

const HomeSlider = () => {
  const [media, setMedia] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch("http://localhost:5000/api/image/all");
        const data = await res.json();
        setMedia(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch media:", error);
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  useEffect(() => {
    if (media.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [media]);

  useEffect(() => {
    if (media.length === 0) return;
    const currentMedia = media[current];
    if (/\.(mp4|webm|ogg)$/i.test(currentMedia?.imageUrl)) {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        if (!muted) videoRef.current.play().catch(() => {});
      }
    }
  }, [current, muted, media]);

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(url);

  if (loading) return <p className="text-center py-10">Loading media...</p>;
  if (media.length === 0) return <p className="text-center py-10">No media found</p>;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Mute Toggle */}
      <button
        onClick={() => setMuted(!muted)}
        className="absolute top-5 right-5 bg-red-200 p-2 rounded z-30 opacity-80 hover:opacity-100"
        title={muted ? "Unmute video" : "Mute video"}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <MuteIcon /> : <SoundIcon />}
      </button>

      {/* Text Content */}
      <div className="absolute top-1/2 left-5 md:left-10 transform -translate-y-1/2 text-white z-20 max-w-md md:max-w-xl p-4">
        <p className="text-xs uppercase font-semibold mb-2">Welcome to Land Cruiser Experience</p>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">Adventure meets luxury — the road is yours to rule.</h1>
        <p className="mt-3 text-sm md:text-base font-medium">
          The Land Cruiser is more than just a vehicle. It’s a symbol of power, reliability, and comfort. Whether you're exploring rugged mountains, remote trails, or cityscapes, it’s not just a drive — it's a journey of confidence, class, and unforgettable memories.
        </p>
       <Link href="/Appointment">
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="bg-red-500 hover:bg-red-600 text-white  font-bold py-2 px-6 rounded text-base md:text-lg shadow-md"
        >
          Book An Appointment
        </motion.button>
      </Link>
      </div>

      {/* Media Display */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        {isVideo(media[current]?.imageUrl) ? (
          <video
            ref={videoRef}
            src={media[current].imageUrl}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover brightness-75"
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-500 brightness-75"
            style={{ backgroundImage: `url(${media[current].imageUrl})` }}
          />
        )}
      </div>
    </section>
  );
};

export default HomeSlider;
