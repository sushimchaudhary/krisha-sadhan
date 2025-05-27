"use client";
import React, { useEffect, useState } from "react";
import HomeSlider from "@/app/(user)/homeSlider/page"
import { Services } from "./Javascript";
import About from "@/app/(user)/About/page";
import Service from "@/app/(user)/Services/page";
import DoctorPage from "../Docter/page";
import AppointmentPage from "../Appointment/page";
function Home() {
  useEffect(() => {
    const carousel = document.querySelector("#carouselAutoplay");
    if (carousel && typeof window !== "undefined" && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 3000,
        ride: "carousel",
        pause: false,
      });
    }
  }, []);

  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   // Backend बाट latest image URL fetch गर्ने function
  //   async function fetchImage() {
  //     try {
  //       const res = await fetch("http://localhost:5000/api/image/latest");
  //       const data = await res.json();
  //       setImageUrl(data.imageUrl);
  //     } catch (error) {
  //       console.error("Failed to fetch image", error);
  //     }
  //   }

  //   fetchImage();
  // }, []);

  return (
    <>
      {/* home section */}

      <HomeSlider/>
      {/* <section className="min-vh-100 d-flex align-items-center Home text-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-4 mb-md-0 Home_body">
              <p className="text-uppercase small fw-bold mb-2">
                Welcome to Medcare
              </p>
              <h1 className="display-4 fw-bold">
                Taking care of your health is our top priority.
              </h1>
              <p className="mt-3 mb-4 text-dark fw-bold">
                Being healthy is more than just not getting sick. It entails
                mental, physical, and social well-being. It's not just about
                treatment, it's about healing.
              </p>
              <button variant="success" size="lg">
                Book An Appointment
              </button>
            </div>

            <div
              className="col-md-6"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "500px",
              }}
            >
              <div
                className="col-md-6 right-bg-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                {!imageUrl && <p>Loading image...</p>}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Welcome to Bista Polyclinic */}
      <About />

      {/* My Services */}
      <Service />

      {/* Years Of experience */}
      <section>
        <div className="container py-5">
          <div className="row align-items-center bg-white shadow rounded-4 p-4 g-4 justify-content-between">
            {/* Left Text Section */}
            <div className="col-lg-7">
              <h2 className="fw-bold mb-3">
                Providing Quality Healthcare Since 2005
              </h2>
              <p className="text-muted">
                Bista Polyclinic is a premier healthcare provider committed to
                delivering exceptional medical services. With a team of
                specialized doctors and state-of-the-art facilities, we ensure
                that our patients receive the highest quality of care.
              </p>
              <p className="text-muted">
                Our mission is to improve the health and wellbeing of the
                communities we serve. We provide patient-centered care with
                compassion, excellence, and integrity.
              </p>

              <div className="row mt-3 mb-4">
                <div className="col-sm-6 col-md-4">
                  <p>
                    <strong>Qualified Doctor</strong>
                  </p>
                  <p>
                    <strong>Patient-centered care</strong>
                  </p>
                </div>
                <div className="col-sm-6 col-md-4">
                  <p>
                    <strong>Emergency Services</strong>
                  </p>
                </div>
                <div className="col-sm-6 col-md-4">
                  <p>
                    <strong>Modern Equipment</strong>
                  </p>
                </div>
              </div>

              <button className="btn btn-primary px-4">Learn more</button>
            </div>

            {/* Right Stats Box */}
            <div className="col-lg-3 text-center bg-primary">
              <div className={`text-white py-4 rounded-3`} id="experienceBox">
                <h3 className="fw-bold mb-1">20+</h3>
                <p className="mb-0">Years Of experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* meet our doctor  */}
      <DoctorPage />

      {/* Appointment */}
      <AppointmentPage/>

      {/* Meet Our Expert Doctors */}
      {/* <section>
        <div className="container py-5 text-center">
          <h2 className="fw-bold">Meet Our Expert Doctors</h2>
          <p className="mb-5">
            Our team of dedicated healthcare professionals committed to
            providing you with exceptional care.
          </p>

          <div className="row g-4">
            {doctors.map((doctor, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 shadow-lg rounded-4 overflow-hidden text-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="img-fluid doctor-img"
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{doctor.name}</h5>
                    <p className={`mb-1 ${doctor.titleColor}`}>
                      {doctor.title}
                    </p>
                    <p className="text-muted small">{doctor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary mt-4 px-4">View All Doctor</button>
        </div>
      </section> */}

      {/* Ready to Schedule an Appointment? */}
      {/* <section className="bg-primary bg-opacity-50 py-5 text-center">
        <div className="container">
          <h2 className="fw-bold text-white mb-3">
            Ready to Schedule an Appointment?
          </h2>
          <p className="text-dark mb-4">
            Our team of healthcare professionals is ready to provide you with
            exceptional care. Book an appointment today.
          </p>
          <a href="#book" className="btn btn-primary px-4 py-2">
            Book Appointment
          </a>
        </div>
      </section> */}

      {/* Health Tips & News */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Health Tips & News</h2>
            <p className="text-muted">
              Stay informed with the latest health news, medical breakthroughs,
              and wellness tips from our experts.
            </p>
          </div>
          <Row>
            {articles.map((article, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm" id="hoverCard">
                  <img
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={300}
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <small className="text-muted">
                      {article.date} | {article.author}
                    </small>
                    <div className="card-title">{article.title}</div>
                    <div className="card-text">{article.description}</div>
                    <Button
                      variant="primary"
                      className="mt-auto align-self-start"
                    >
                      Read More
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section> 
      <section>
        <Container className="container my-5">

          <h6 className="text-primary">Book an Appointment</h6>
          <h2 className="mb-4">Schedule Your Visit</h2>
          <Row className="justify-content-between">
            <Col xs={12} lg={6}>
              <Form>
                <Row className="mb-3">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Control type="text" placeholder="Full Name" />
                  </Col>
                  <Col md={6}>
                    <Form.Control type="text" placeholder="98xxxxxxxx" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Select>
                      <option>Disabled select</option>
                      <option>Dr. Sharma</option>
                      <option>Dr. Patel</option>
                    </Form.Select>
                  </Col>
                  <Col md={6}>
                    <Form.Control type="date" placeholder="mm/dd/yyyy" />
                  </Col>
                </Row>
                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="Select Department"
                />
                <Form.Control
                  className="mb-3"
                  as="textarea"
                  rows={3}
                  placeholder="Message (Optional)"
                />
                <Button type="submit" className="w-100" variant="primary">
                  View All Doctor
                </Button>
              </Form>
            </Col>

            <Col xs={12} lg={6} className="mt-4 mt-lg-0">
              <Card className="border-0 shadow-sm">
                <img
                  src={welcomeData.image}
                  className="card-img-top img-fluid"
                />

                <div className="card-body">
                  <h5 className="fw-bold">Working Hours</h5>
                  <div className="d-flex justify-content-between">
                    <span>Monday–Friday</span>
                    <span>8:00AM–8:00PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Saturday</span>
                    <span>9:00AM–6:00PM</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Sunday</span>
                    <span>10:00AM–4:00PM</span>
                  </div>
                  <div className="mt-2 text-success fw-bold">
                    Emergency Services <span className="float-end">24/7</span>
                  </div>

                  <div className="mt-3">
                    <strong>Need Help?</strong>
                    <br />
                    <small>
                      For any queries regarding application or Emergencies,
                      Please call:
                      <br />
                      <a
                        href="tel:+9779812345678"
                        className="text-primary fw-semibold"
                      >
                        +977 9812345678
                      </a>
                    </small>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Our Location */}
      <section className="py-5">
        <div className="container border">
          <h2 className="text-center fw-bold">Our Location</h2>
          <p className="text-center mb-5 text-secondary">
            We are conveniently located in the heart of Sisahaniya, easily
            accessible by public transportation.
          </p>
          <div className="row justify-content-between">
            {/* Google Map */}
            <div className="col-md-8 mb-4 mb-md-0 shadow Google_map p-3">
              <iframe
                className="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.792241685426!2d82.64891677536298!3d27.846924076102844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3997a52d310096c1%3A0x755cd9290d7a9868!2sBista%20polyclinic!5e0!3m2!1sen!2snp!4v1747974848282!5m2!1sen!2snp"
                width={850}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="col-md-1"></div>
            {/* Contact Information */}
            <div className="col-md-3 text-start">
              <h3 className="fw-bold">Contact Information</h3>
              <p>
                <strong>Address</strong>
                <br />
                RMW2+QH9, Sisahaniya 22400
              </p>
              <p>
                <strong>Phone Number</strong>
                <br />
                +27 (0)12 664-0222
              </p>
              <p>
                <strong>Email Address</strong>
                <br />
                info@bistapoliclinic.co.za
              </p>
              <p>
                <strong>Working Hours</strong>
                <br />
                Monday - Friday: 8:00 AM – 8:00 PM
                <br />
                Saturday: 9:00 AM – 6:00 PM
                <br />
                Sunday: 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
