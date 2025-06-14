"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const adminStr = localStorage.getItem("admin");
    if (adminStr) {
      try {
        const adminObj = JSON.parse(adminStr);
        setRole(adminObj.role);
      } catch (err) {
        setRole(null);
      }
    }
  }, []);

  return (
    <nav className=" text-white flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link href="/">LandCruiser System</Link>
      </div>
      <div className="space-x-6">
        {role === "admin" && (
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}
        {role === "user" && (
          <Link href="/dashboard/users" className="hover:underline">
            User Dashboard
          </Link>
        )}
        {!role && (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
