"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface News {
  _id: string;
  title: string;
  description: string;
  author: string;
  image: string;
}

const Page = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/news");
      setNewsList(res.data);
    } catch (err) {
      console.error("Fetch news error", err);
      toast.error("Could not load news");
    }
  };

  const handleLearnMore = (id: string) => {
    router.push(`/News/${id}`);
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />

      {/* Header Section */}
      <section className="text-center py-10">
        <h2 className="text-4xl font-bold">
          Explore the Wild in Style – Land Cruiser Tour Now Available!
        </h2>
        <p className="text-gray-600 mt-2 max-w-7xl mx-auto py-3">
          Adventure meets luxury with our newly launched Land Cruiser Tour,
          designed for travelers who crave the thrill of the road without
          compromising on comfort. This premium experience takes you through
          breathtaking landscapes, rugged trails, and scenic routes—all from the
          seat of one of the most iconic off-road vehicles ever built. With
          expert guides, fully serviced Land Cruisers, and personalized
          itineraries, every moment of your journey is crafted for exploration
          and elegance. Whether you're chasing mountain views or desert
          horizons, the Land Cruiser promises unmatched performance, safety, and
          style. 📍 Bookings are now open! Discover remote destinations like
          never before—reserve your tour and experience the legend firsthand.
        </p>
      </section>

      {/* News Cards */}
      <main className="container pb-5">
        <div className="row g-4 h-40%">
          {newsList.slice(0, 4).map((item) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item._id}>
              <div className="card h-100 border-1 shadow-sm hover-shadow-lg transition-all overflow-hidden rounded-2xl">
                {/* Image Section */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ height: "200px" }}
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="img-fluid p-1 rounded-2xl w-100 h-100 object-cover"
                  />
                </div>
                {/* Body */}
                <div className="card-body d-flex flex-column">
                  <small className="text-muted mb-2">By {item.author}</small>
                  <h5 className="card-title text-dark fw-semibold mb-2">
                    {item.title}
                  </h5>
                  <p
                    className="card-text text-muted mb-3"
                    style={{ flexGrow: 1 }}
                  >
                    {item.description.length > 50
                      ? item.description.slice(0, 50) + "..."
                      : item.description}
                  </p>
                  <div className="mt-1">
                    <button
                      className="mt-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm px-4 py-1 w-34 rounded font-semibold transition"
                      onClick={() => handleLearnMore(item._id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {newsList.length > 4 && (
          <div className="text-center py-6">
            <button
              onClick={() => router.push("/allNews")}
              className="mt-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-sm px-4 py-2 w-42 rounded font-semibold transition"
            >
              View All News
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
