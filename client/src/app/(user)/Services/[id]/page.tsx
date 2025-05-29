import axios from "axios";

const getServiceById = async (id: string) => {
  const res = await axios.get(`http://localhost:5000/api/services/${id}`);
  return res.data;
};

const ServiceDetailPage = async ({ params }: { params: { id: string } }) => {
  const service = await getServiceById(params.id);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <img
          src={`http://localhost:5000${service.image}`}
          alt={service.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
        <p className="text-gray-700 leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
