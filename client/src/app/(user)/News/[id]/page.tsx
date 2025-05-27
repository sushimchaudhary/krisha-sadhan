// app/(user)/News/[id]/page.tsx
import axios from "axios";
import { notFound } from "next/navigation";

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

const getNewsById = async (id: string): Promise<News | null> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/news/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

export default async function NewsDetailPage({ params }: Props) {
  const news = await getNewsById(params.id);

  if (!news) return notFound();

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">{news.title}</h1>
        <p className="text-gray-600 mb-6">By {news.author}</p>
        <img
          src={`http://localhost:5000${news.image}`}
          alt={news.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-800 whitespace-pre-line">{news.description}</p>
      </div>
    </div>
  );
}
