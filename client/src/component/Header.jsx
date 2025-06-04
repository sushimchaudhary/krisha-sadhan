"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <>
      {/* Header Top Bar */}
      <section className="bg-red-500 text-white py-2 sm_none">
        <div className="container mx-auto">
          <div className="row align-items-center justify-content-between text-center text-md-start">
            <div className="col-md-8 d-flex flex-column flex-md-row align-items-center gap-2 small">
              <span className="d-flex align-items-center">
                <FaClock className="me-1" /> {formattedTime}
              </span>
              <span className="d-flex align-items-center ms-md-3">
                <FaMapMarkerAlt className="me-1" /> Tarakeshwar, Kathmandu
              </span>
              <span className="d-flex align-items-center ms-md-3">
                <FaEnvelope className="me-1" /> info@nepguru.com
              </span>
            </div>
            <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-3 mt-2 mt-md-0">
              <a href="#" className="text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar */}
      <nav className="navbar bg-white navbar-expand-lg py-3 border-top border-bottom sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <h5 className="offcanvas-title flex" id="offcanvasNavbarLabel">
              𝕶𝖗𝖎𝖘𝖍𝖆<p className="logo text-red-500">𝕾𝖆𝖉𝖍𝖆𝖓</p>
            </h5>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Image
                  src="/logo.jpg"
                  alt="krisha Logo"
                  width={150}
                  height={150}
                />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>

            <div className="offcanvas-body align-items-center">
              <ul className="navbar-nav justify-content-end flex-grow-1 end">
                {/* Navigation Links with animation */}
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/About" },
                  { label: "Services", href: "/Services" },
                  { label: "Tours", href: "/Tour" },
                  { label: "News", href: "/News" },
                  { label: "Contact", href: "/Contact" },
                ].map(({ label, href }) => (
                  <li key={label} className="nav-item group relative mx-1">
                    <Link
                      className="nav-link text-gray-800 transition-colors "
                      href={href}
                    >
                      <span className="relative inline-block">
                        {label}
                        <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-red-500 transition-all duration-300 ease-out transform -translate-x-1/2 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}

                {/* Buttons */}
                <div className="flex gap-3 text-end mt-3">
                  <li>
                    <Link href="/Appointment" className="text-decoration-none">
                      <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
                        Book Now
                        <FaArrowRightLong className="text-lg" />
                      </button>
                    </Link>
                  </li>

                  {isAdmin && (
                    <li>
                      <Link className="text-decoration-none" href="/dashboard">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                          Dashboard
                        </button>
                      </Link>
                    </li>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
