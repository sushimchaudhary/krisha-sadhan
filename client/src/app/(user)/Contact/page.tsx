import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function page() {
  return (
    <>
      {/* Our Location */}
      <section className="py-5">
        <div className="container border rounded">
          <h2 className="text-center fw-bold">Our Location</h2>
          <p className="text-center mb-5 text-secondary">
            Located in the scenic hills of Tarkeshwor, Kathmandu, our Land
            Cruiser tourism hub serves as the perfect gateway to Nepal’s rugged
            beauty. Just a short drive from central Kathmandu, our base is
            surrounded by peaceful landscapes, fresh mountain air, and
            traditional charm — ideal for travelers seeking both adventure and
            authenticity. Whether you’re heading off to Langtang, Mustang, or
            exploring off-road trails around the Valley, our convenient location
            offers quick access to highways and mountain routes. We’re also
            easily reachable by public transport, taxi, or private vehicle.
            Start your unforgettable journey with us — right here in The King of Land Cruiser!
          </p>
          <div className="row justify-content-between">
            {/* Google Map */}
            <div className="col-md-8 mb-4 mb-md-0 shadow Google_map p-3">
              <iframe
                className="map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d672.3705422392968!2d85.30995826950577!3d27.754087185326732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQ1JzE0LjciTiA4NcKwMTgnMzguMiJF!5e1!3m2!1sen!2snp!4v1748498794836!5m2!1sen!2snp"
                width={800}
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
                Q836+J6Q Tarakeshwar, Manamaiju
              </p>
              <p>
                <strong>Phone Number</strong>
                <br />
                +27 (0)12 664-0222
              </p>
              <p>
                <strong>Email Address</strong>
                <br />
                info@landcruiser.co.za
              </p>
              <p>
                <strong>Emergency Services 24 Hours Available </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
