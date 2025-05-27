'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about-sliders") // ensure this is your route
      .then((res) => {
        console.log(res.data);
        setSlides(res.data);
      })
      .catch((err) => console.log(err));
  }, []);



  
  return (
    <section>
      <div className="container py-5">
        <div className="row align-items-center bg-white shadow rounded-4 p-4 g-3 justify-content-between">
          {/* Image Section */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div
              id="carouselAutoplay"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {slides.length > 0 ? (
                  slides.map((slide, index) => (
                    <div
                      key={slide._id || index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={slide.imageUrl}
                        className="d-block w-100"
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-muted">No slides found.</div>
                )}
              </div>
              {slides.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselAutoplay"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" />
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselAutoplay"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" />
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Text Section */}
          <div className="col-lg-5">
            <h2 className="fw-bold">Welcome to Our Clinic</h2>
            <hr />
            <p className="text-muted">Your health is our priority.</p>
            <p className="text-muted">
              We offer expert medical consultation and treatment.
            </p>
            <button className="btn btn-primary mt-3 px-4">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
