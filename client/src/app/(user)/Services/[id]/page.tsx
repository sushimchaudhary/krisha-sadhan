'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Service {
  _id: string;
  image: string;
  title: string;
  description: string;
  link: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/${params.id}`);
        setService(res.data);
      } catch (error) {
        console.error('Error fetching service:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!service) return <div className="text-center py-20 text-danger">Service not found</div>;

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  const descriptionToShow =
    service.description.length > 220 && !showFullDescription
      ? service.description.slice(0, 220).trimEnd() + '…'
      : service.description;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5 border-bottom">
          {/* Image Column */}
          <div className="col-md-4 border-top py-3">
            <div
              className="rounded-3 overflow-hidden"
              style={{
                height: '320px',
                maxWidth: '100%',
              }}
            >
              <img
                src={`http://localhost:5000${service.image}`}
                alt={service.title}
                className="img-fluid w-100 h-100 object-fit-cover rounded-3"
              />
            </div>
          </div>

          {/* Text Column */}
          <div
            className="col-md-8 border-top py-3"
            style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-line',
            }}
          >
            <h1 className="py-3 text-start text-dark">{service.title}</h1>
            <p
              className="text-secondary"
              style={{ lineHeight: '1.7', fontSize: '1.05rem' }}
            >
              {descriptionToShow}
            </p>
            {service.description.length > 220 && (
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
