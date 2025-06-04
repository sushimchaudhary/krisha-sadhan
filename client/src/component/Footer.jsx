'use client'
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const footerData = {
  lc: {
    name: "The king of Land Cruiser",
    description:
       "The King of Land Cruiser Tours is a premier adventure experience committed to delivering exceptional travel with a focus on comfort, safety, and unforgettable exploration.",
    social: [
      { icon: <FaFacebookF />, link: "#" },
      { icon: <FaTwitter />, link: "#" },
      { icon: <FaInstagram />, link: "#" },
      { icon: <FaLinkedinIn />, link: "#" },
    ],
  },
  links: [
    "Home",
    "About",
    "Our Services",
    "Our Tours",
    "News & Updates",
    "Contact us",
  ],
  contact: {
    address: "Tarakeshwar, kathmandu",
    email: "info@landcruiser.com",
    phone: "+01 234 567 88",
    locationCode: "Q836+J6Q Tarakeshwar",
  },
 
  emergency: {
    note: "Available 24/7",
    number: "+977 xxxxxxx",
  },
};

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-red-500 text-white py-10 relative">
        <div className="container mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* lc Info */}
            <div>
              <h5 className="text-xl font-extrabold mb-4">
                {footerData.lc.name}
              </h5>
              <p className="mb-4">{footerData.lc.description}</p>
              <div className="flex space-x-3">
                {footerData.lc.social.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="text-white hover:text-gray-300 text-lg"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {footerData.links.map((link, index) => (
                  <li key={index} className="hover:underline cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Contact</h5>
              <p className="flex items-start gap-2 mb-2">
                <FaMapMarkerAlt className="mt-1" />
                {footerData.contact.address}
              </p>
              <p className="flex items-center gap-2 mb-2">
                <FaEnvelope /> {footerData.contact.email}
              </p>
              <p className="flex items-center gap-2 mb-2">
                <FaPhoneAlt /> {footerData.contact.phone}
              </p>
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                {footerData.contact.locationCode}
              </p>
            </div>

            {/* Opening Hours */}
            <div>
              
              <h6 className="text-lg font-semibold mb-1">Emergency Services</h6>
              <p className="mb-1">{footerData.emergency.note}</p>
              <p className="text-lg font-bold">
                Call: {footerData.emergency.number}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-white/70">
            &copy; {new Date().getFullYear()} {footerData.lc.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-circle bg-primary text-white shadow-lg hover:bg-secondary transition-all"
        >
          <IoIosArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default Footer;
