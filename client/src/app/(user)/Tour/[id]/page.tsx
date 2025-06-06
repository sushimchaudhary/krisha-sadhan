'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Doctor {
  _id: string;
  title: string;
  price: string;
  education: string[];
  duration: string;
  description: string;
  image: string;
}

interface Props {
  params: { id: string };
}

export default function DoctorDetailsPage({ params }: Props) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/doctors/${params.id}`
        );
        setDoctor(res.data);
      } catch (err) {
        console.error('Failed to fetch doctor details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!doctor)
    return <div className="text-center py-20 text-danger">Doctor not found</div>;

  const toggleDescription = () => setShowFullDescription((p) => !p);

  const descriptionToShow =
    doctor.description.length > 220 && !showFullDescription
      ? doctor.description.slice(0, 220).trimEnd() + '…'
      : doctor.description;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5 border-bottom">
          {/* Image with OFFER / education overlay */}
          <div className="col-md-4 border-top py-3">
            <div
              className="position-relative rounded-3 overflow-hidden"
              style={{ height: '320px', maxWidth: '100%' }}
            >
              {/* the image */}
              <img
                src={`http://localhost:5000${doctor.image}`}
                alt={doctor.title}
                className="img-fluid w-100 h-100 object-fit-cover rounded-3"
              />

              {/* overlay badge (top-left) */}
              <div
                className="position-absolute top-0 right-0 m-2  bg-yellow-600 text-white px-3 py-2 rounded"
                style={{ maxWidth: '85%' }}
              >
                {doctor.education.map((edu, i) => (
                  <div key={i} className="fw-bold small lh-sm">
                    {edu}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details text */}
          <div
            className="col-md-8 border-top py-3"
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-line',
            }}
          >
            <h1 className="py-3 text-start text-dark">{doctor.title}</h1>
            <p className="text-muted mb-2">{doctor.duration}</p>

            <div className="d-flex align-items-center mb-3">
              <span className="fw-bold">Price:</span>
              <span className="text-success fw-semibold ms-2">
                {doctor.price}
              </span>
            </div>

            <p
              className="text-secondary"
              style={{ lineHeight: '1.7', fontSize: '1.05rem' }}
            >
              {descriptionToShow}
            </p>

            {doctor.description.length > 220 && (
              <button
                onClick={toggleDescription}
                className="mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 text-sm rounded transition"

              >
                {showFullDescription ? 'See Less ▲' : 'See More ▼'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
