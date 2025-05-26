import React from 'react'
import { cardData, Services as servicesData } from '../Pages/Javascript'

const Services = () => {
  return (
    <div>
       {/* My Services */}
            <section>
              <div className="container py-5">
                <div className="row text-center">
                  <h2 className="mb-3 text-primary fw-bold">My Services</h2>
                  <p className="text-muted mb-5">
                    Comprehensive digital marketing solutions for your business
                  </p>
                </div>
      
                <div className="row g-4 justify-content-center">
                  {cardData.map((card, index) => (
                    <div className="col-12 col-sm-6 col-lg-3" key={index}>
                      <div
                        className={`card h-100 text-center shadow-sm`}
                        id="hoverCard"
                      >
                        <div className="card-body">
                          <div className={`mb-3 fs-2 ${card.color}`}>
                            <i className={`bi ${card.icon}`}></i>
                          </div>
                          <h5 className="card-title fw-bold">{card.title}</h5>
                          <p className="card-text">{card.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          {/* Healthcare Services */}
      <section>
        <div className="container py-5 text-center">
          <p className="text-primary fw-semibold mb-1">Our Services</p>
          <h2 className="fw-bold mb-3">Comprehensive Healthcare Services</h2>
          <p className="mb-5 px-2 px-md-5">
            We offer a wide range of medical services to meet all your healthcare needs. Our specialized departments provide comprehensive care with the latest medical technologies.
          </p>

          <div className="row g-4">
            {servicesData.map((service, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="picc">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="card-img-top img-fluid"
                    />
                  </div>
                  <div className="card-body text-start">
                    <h5 className="card-title fw-bold">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                    <a
                      href={service.link}
                      className="text-primary text-decoration-none"
                    >
                      Learn More <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary mt-5 px-4 py-2">
            View All Service
          </button>
        </div>
      </section>
    </div>
  )
}

export default Services