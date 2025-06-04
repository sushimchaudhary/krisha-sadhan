"use client";
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
      <div className="container py-5 justify-content-between">
        <div className="row align-items-center bg-white shadow rounded-4 p-4 g-3 justify-content-between">
         {/* Image Section */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div
              id="carouselAutoplay"
              className="carousel slide h-100"
              data-bs-ride="carousel"
              data-bs-interval="5000"
            >
              {/* Dot Indicators */}
              {slides.length > 1 && (
                <div className="carousel-indicators mb-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselAutoplay"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : undefined}
                      aria-label={`Slide ${index + 1}`}
                      style={{ width: "12px", height: "12px", borderRadius: "50%" }}
                    />
                  ))}
                </div>
              )}

              <div
                className="carousel-inner"
                style={{ height: "400px" }}
              >
                {slides.length > 0 ? (
                  slides.map((slide, index) => (
                    <div
                      key={slide._id || index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      style={{ height: "100%" }}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={`Slide ${index + 1}`}
                        className="d-block w-100"
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "12px",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-muted">No slides found.</div>
                )}
              </div>
            </div>
          </div>



          {/* Text Section */}
          <div className="col-12 col-lg-6 text-center text-lg-start">
            <h2 className="fw-bold">The King of Land Cruiser Adventures</h2>
            <hr />
            
            <p className="text-muted">
              🌍 Description: Embark on the ultimate journey with The King of
              Land Cruiser Adventures, where luxury meets rugged exploration.
              Experience Nepal’s breathtaking landscapes—from soaring Himalayan
              peaks to remote off-road trails—in unmatched style and comfort.
              Whether it’s a high-altitude expedition or a cultural road trip
              through hidden villages, our Land Cruiser tours promise safety,
              thrill, and unforgettable memories at every turn. Perfect for
              adventurers, explorers, and those seeking a premium travel
              experience.
            </p>
            {/* <button className="btn btn-primary mt-3 px-4">Get Started</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;



