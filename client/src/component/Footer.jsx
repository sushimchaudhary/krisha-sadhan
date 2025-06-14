"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  FaFacebookF,
  
  FaInstagram,
  
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const footerData = {
  brand: {
    name: "The King of Land Cruiser",
    description:
      "The King of Land Cruiser Tours delivers exceptional travel experiences focusing on comfort, safety, and unforgettable exploration.",
    social: [
      { icon: <FaFacebookF />, link: "#" },
     
      { icon: <FaInstagram />, link: "#" },
      { icon: <FaWhatsapp />, link: "#" },
    ],
  },
  links: [
    { label: "Home", href: "#" },
    { label: "About", href: "About" },
    { label: "Our Services", href: "Services" },
    { label: "Our Tours", href: "Tour" },
    { label: "News & Updates", href: "News" },
    { label: "Contact Us", href: "Contact" },
  ],
  contact: {
    address: "Tarakeshwar, Kathmandu",
    email: "tharurohit2002@gmail.com",
    phone: "+0123456788",
    locationCode: "Q836+J6Q Tarakeshwar",
  },
  emergency: {
    note: "Available 24/7",
    number: "+977 xxxxxxx",
  },
};

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // hide footrrer 
  const pathname = usePathname(); // ✅ always call at top level
  const hideHeader = pathname === "/auth/adminLogin"; // ✅ create a flag
  const hideFooter = pathname === "/auth/adminRegister/superAdmin";



  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (hideHeader) return null; // ✅ Early return if path matches
  if (hideFooter) return null;

  return (
    <>
      <footer className="bg-red-500 text-white py-12">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{footerData.brand.name}</h2>
            <p className="mb-6 max-w-xs leading-relaxed">
              {footerData.brand.description}
            </p>
            <div className="flex space-x-4 text-lg">
              {footerData.brand.social.map(({ icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  aria-label="Social Link"
                  className="text-white text-decoration-none"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold  mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerData.links.map(({ label, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    className="text-white text-decoration-none hover:underline underline-offset-4 hover:text-red-300 transition-all duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt /> {footerData.contact.address}
            </p>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${footerData.contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-3 text-white text-decoration-none"
            >
              <FaEnvelope /> {footerData.contact.email}
            </a>

            <a
              href={`tel:${footerData.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 mb-3 text-white text-decoration-none "
            >
              <FaPhoneAlt /> {footerData.contact.phone}
            </a>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {footerData.contact.locationCode}
            </p>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Emergency Services</h3>
            <p className="mb-2">{footerData.emergency.note}</p>
            <a
              href={`tel:${footerData.emergency.number.replace(/\s+/g, "")}`}
              className="text-lg font-bold text-white text-decoration-none "
            >
              Call: {footerData.emergency.number}
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-white/70">
          &copy; {new Date().getFullYear()} {footerData.brand.name}. All rights
          reserved.
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 bg-red-500 hover:bg-red-600 text-white shadow-lg rounded h-8 w-8 flex items-center justify-center transition"
        >
          <IoIosArrowUp className="text-xl" />
        </button>
      )}
    </>
  );
};

export default Footer;
