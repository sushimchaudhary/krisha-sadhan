'use client';

import axios from 'axios';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface News {
  _id: string;
  title: string;
  description: string;
  author: string;
  image: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default function NewsDetailPage({ params }: Props) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/${params.id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!news) return notFound();

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  const descriptionToShow =
    news.description.length > 220 && !showFullDescription
      ? news.description.slice(0, 220).trimEnd() + '…'
      : news.description;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5 border-bottom">
          {/* Image Column */}
          <div className="col-md-4 border-top py-3">
            <div
              className="rounded-2 overflow-hidden"
              style={{ height: '320px', maxWidth: '100%' }}
            >
              <img
                src={`http://localhost:5000${news.image}`}
                alt={news.title}
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
            <h1 className="py-3 text-start text-dark">{news.title}</h1>
            <p className="text-muted text-start">By {news.author}</p>
            <p
              className="text-secondary"
              style={{ lineHeight: '1.7', fontSize: '1.05rem' }}
            >
              {descriptionToShow}
            </p>

            {news.description.length > 220 && (
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
