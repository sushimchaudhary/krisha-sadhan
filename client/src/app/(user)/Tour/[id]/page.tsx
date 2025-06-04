// /app/Doctor/[id]/page.tsx

import axios from "axios";

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

const getDoctorById = async (id: string): Promise<Doctor | null> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/doctors/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch doctor details", err);
    return null;
  }
};

export default async function DoctorDetailsPage({ params }: Props) {
  const doctor = await getDoctorById(params.id);

  if (!doctor)
    return <div className="text-center py-20 text-danger">Doctor not found</div>;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5 border-bottom">
          {/* Image */}
          <div className="col-md-4 border-top py-3">
            <div
              className="rounded-3 overflow-hidden"
              style={{
                height: "320px",
                maxWidth: "100%",
              }}
            >
              <img
                src={`http://localhost:5000${doctor.image}`}
                alt={doctor.title}
                className="img-fluid w-100 h-100 object-fit-cover rounded-3"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className="col-md-8 border-top py-3"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-line",
            }}
          >
            <h1 className="py-3 text-start text-dark">{doctor.title}</h1>
            <p className="text-success fw-semibold">{doctor.price}</p>
            <p className="text-muted mb-2">{doctor.duration}</p>
            <p className="text-secondary" style={{ lineHeight: "1.7", fontSize: "1.05rem" }}>
              {doctor.description}
            </p>
            <ul className="ps-3 mb-0 text-danger fw-bold">
              {doctor.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
