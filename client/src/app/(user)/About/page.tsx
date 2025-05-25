import React from 'react'
import { slides, welcomeData } from '../Pages/Javascript'

function Page() {
  return (
    <>
      <section>
             <div className="container py-5">
               <div className="row align-items-center bg-white shadow rounded-4 p-4 g-3 justify-content-between ">
                 {/* Image Section */}
                 <div className="col-lg-6 mb-4 mb-lg-0">
                   {/* <img
                     src={welcomeData.image}
                     className="card-img-top img-fluid rounded"
                   /> */}
                   <div
                     id="carouselAutoplay"
                     className="carousel slide"
                     data-bs-ride="carousel"
                   >
                     <div className="carousel-inner">
                       {slides.map((slide, index) => (
                         <div
                           key={slide.id}
                           className={`carousel-item ${index === 0 ? "active" : ""}`}
                         >
                           <img
                             src={slide.image}
                             className="d-block w-100"
                             alt={slide.alt}
                           />
                           <div className="carousel-caption d-none d-md-block">
                             <h5>{slide.caption}</h5>
                           </div>
                         </div>
                       ))}
                     </div>
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
                   </div>
                 </div>
     
                 {/* Text Section */}
                 {/* <div className="col-lg-1 hidden">
                 </div> */}
                 <div className="col-lg-5">
                   <h2 className="fw-bold">{welcomeData.title}</h2>
                   <hr />
                   <p className="text-muted">{welcomeData.intro}</p>
                   <p className="text-muted">{welcomeData.details}</p>
                   <button className="btn btn-primary mt-3 px-4">
                     {welcomeData.buttonText}
                   </button>
                 </div>
               </div>
             </div>
           </section>
     
    </>
  )
}

export default Page
