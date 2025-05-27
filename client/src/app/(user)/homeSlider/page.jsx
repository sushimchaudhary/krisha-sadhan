'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeSlider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch('http://localhost:5000/api/image/all');
        const data = await res.json();

        // If your backend response is { images: [...] }
        // setImages(data.images);

        // If your backend response is just an array
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); // Slide every 4 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (loading) return <p className="text-center py-10">Loading images...</p>;
  if (images.length === 0) return <p className="text-center py-10">No images found</p>;

  return (
    <section
      className="home-slider position-relative"
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* Text Overlay */}
      <div
        className="position-absolute text-white p-4"
        style={{
          top: '50%',
          left: '50px',
          transform: 'translateY(-50%)',
          maxWidth: '40%',
          zIndex: 10,
          borderRadius: '8px',
        }}
      >
        <p className="text-uppercase small fw-bold mb-2">Welcome to Medcare</p>
        <h1 className="display-4 fw-bold">
          Taking care of your health is our top priority.
        </h1>
        <p className="mt-3 mb-4 fw-bold">
          Being healthy is more than just not getting sick. It entails mental,
          physical, and social well-being. It's not just about treatment, it's about healing.
        </p>
        <Link href="/Appointment">
          <button className="btn btn-primary btn-lg">Book An Appointment</button>
        </Link>
      </div>

      {/* Background Image Slide */}
      <div
        className="slider-image"
        style={{
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${images[current]?.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.8s ease-in-out',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Optional Navigation Arrows */}
      <button onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)} className="position-absolute" style={{ top: '50%', left: '20px', zIndex: 20 }}>‹</button>
      <button onClick={() => setCurrent((current + 1) % images.length)} className="position-absolute" style={{ top: '50%', right: '20px', zIndex: 20 }}>›</button>
    </section>
  );
};

export default HomeSlider;
