


'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomeSlider = () => {
  const [media, setMedia] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('http://localhost:5000/api/image/all');
        const data = await res.json();
        setMedia(data); // assuming data is array of { imageUrl }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch media:', error);
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  useEffect(() => {
    if (media.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [media]);

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  if (loading) return <p className="text-center py-10">Loading media...</p>;
  if (media.length === 0) return <p className="text-center py-10">No media found</p>;

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

      {/* Media Background */}
      <div
        className="slider-image position-absolute top-0 start-0 w-100 h-100"
        style={{ zIndex: 1, overflow: 'hidden' }}
      >
        {isVideo(media[current]?.imageUrl) ? (
          <video
            src={media[current].imageUrl}
            autoPlay
            muted
            loop
            className="w-100 h-100 object-cover"
            style={{ filter: 'brightness(0.7)', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              backgroundImage: `url(${media[current].imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
              filter: 'brightness(0.7)',
              transition: 'background-image 0.8s ease-in-out',
            }}
          />
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={() => setCurrent(current === 0 ? media.length - 1 : current - 1)}
        className="position-absolute"
        style={{ top: '50%', left: '20px', zIndex: 20 }}
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % media.length)}
        className="position-absolute"
        style={{ top: '50%', right: '20px', zIndex: 20 }}
      >
        ›
      </button>
    </section>
  );
};

export default HomeSlider;

