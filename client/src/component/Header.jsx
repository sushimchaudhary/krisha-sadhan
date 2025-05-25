"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <>
      {/* header section start */}
      <section className="bg-primary text-white py-2 sm_none">
        <div className="container mx-auto">
          <div className="row align-items-center justify-content-between text-center text-md-start">
            <div className="col-md-8 d-flex flex-column flex-md-row align-items-center gap-2 small">
              <span className="d-flex align-items-center">
                <FaClock className="me-1" /> Sun–Fri: 07:00AM - 6:00PM
              </span>
              <span className="d-flex align-items-center ms-md-3">
                <FaMapMarkerAlt className="me-1" /> New Baneshwor, Kathmandu
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
                <FaTwitter />
              </a>
              <a href="#" className="text-white">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* navbar start */}
      <nav className="navbar bg-light navbar-expand-lg py-3 border-top border-bottom sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand" href="/">
            BISTA<span>POLICLINIC</span>
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
                BISTA<span className="logo">BISTAPOLICLINIC</span>
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
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/About" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/Services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/Docter">
                    Docter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/News">
                    News
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/Contact">
                    Contact
                  </Link>
                </li>

                <div className="flex gap-3 text-end">
                <li>
                  <Link href="/Appointment" className="text-decoration-none">
                    <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded">
                      Appointment
                      <FaArrowRightLong className="text-lg" />
                    </button>
                  </Link>
                </li>
                {/* Conditional Dashboard */}
                {isAdmin && (
                  <li>
                    <Link className="text-decoration-none" href="/dashboard">
                      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                )}

                {!isAdmin && (
                  <li>
                    <Link
                      className="text-decoration-none"
                      href="/auth/adminLogin"
                    >
                      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
                        Login
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
