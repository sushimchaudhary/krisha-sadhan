import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

const footerData = {
  clinic: {
    name: "BISTA POLYCLINIC",
    description:
      "Bista Polyclinic is a premier healthcare institution committed to providing exceptional medical care with a focus on patient comfort and well-being.",
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
    "Our Doctors",
    "News & Updates",
    "Contact us",
  ],
  contact: {
    address: "Sisahaniya, Rapti-7, Dang",
    email: "info@bistapoliclinic.com",
    phone: "+01 234 567 88",
    locationCode: "RMW2+QH9, Sisahaniya 22400",
  },
  hours: {
    weekdays: "8:00 AM - 8:00 PM",
    saturday: "Closed",
  },
  emergency: {
    note: "Available 24/7",
    number: "+977 1 4123457",
  },
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="border container mx-auto  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div>
            <h5 className="text-xl font-semibold mb-4">{footerData.clinic.name}</h5>
            <p className="mb-4">{footerData.clinic.description}</p>
            <div className="flex space-x-3">
              {footerData.clinic.social.map((item, index) => (
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
              <FaMapMarkerAlt className="mt-1" /> {footerData.contact.address}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaEnvelope /> {footerData.contact.email}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaPhoneAlt /> {footerData.contact.phone}
            </p>
            <p className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1" /> {footerData.contact.locationCode}
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Opening Hours</h5>
            <p className="flex justify-between border-b border-white/30 pb-1 mb-1">
              <span>Sunday - Friday</span>
              <span>{footerData.hours.weekdays}</span>
            </p>
            <p className="flex justify-between border-b border-white/30 pb-1 mb-4">
              <span>Saturday</span>
              <span>{footerData.hours.saturday}</span>
            </p>
            <h6 className="text-lg font-semibold mb-1">Emergency Services</h6>
            <p className="mb-1">{footerData.emergency.note}</p>
            <p className="text-lg font-bold">Call: {footerData.emergency.number}</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} {footerData.clinic.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
