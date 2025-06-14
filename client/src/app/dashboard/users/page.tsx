"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/component/LogoutButton";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAppointments: 0,
  });
  const [username, setUsername] = useState("Admin");
  const [loadingStats, setLoadingStats] = useState(true);
  const [showSidebarText, setShowSidebarText] = useState(false);

  // यहाँ Lock icon click बाट Logout panel toggle गर्न state
  const [showLogoutPanel, setShowLogoutPanel] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await fetch("http://localhost:5000/api/admin/stats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoadingStats(false);
      }
    };

    const storedAuth = localStorage.getItem("user");
    if (storedAuth) {
      try {
        const user = JSON.parse(storedAuth);
        setUsername(user.username || "User");
      } catch {
        setUsername("User");
      }
    }

    fetchStats();
  }, []);

  const navItems = [
    { href: "", icon: "📊", label: "Dashboard" },
    { href: "/Tour", icon: "🚗", label: "Tours" },
    { href: "/auth/admin/appointments", icon: "📅", label: "Appointments" },
    { href: "/News", icon: "📰", label: "News" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          showSidebarText ? "w-48" : "w-20"
        } bg-gradient-to-b from-blue-100 to-blue-50 shadow-lg flex flex-col justify-between py-4 relative`}
        onMouseEnter={() => setShowSidebarText(true)}
        onMouseLeave={() => {
          setShowSidebarText(false);
          setShowLogoutPanel(false); // Sidebar बन्द हुँदा logout panel पनि बन्द गर
        }}
      >
        <div className="py-4">
          <div className="px-2 py-3 border-b border-blue-200 flex items-center gap-1">
            <span className="text-2xl">🛠️</span>
            {showSidebarText && (
              <h2 className="text-xl font-bold text-blue-800 whitespace-nowrap transition-opacity duration-300">
                UserPanel
              </h2>
            )}
          </div>

          <nav className="space-y-6 text-black text-sm font-medium w-full px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 p-2 rounded transition-colors duration-200 cursor-pointer
                hover:bg-blue-200 hover:text-white text-decoration-none"
              >
                <span className="text-xl">{item.icon}</span>
                {showSidebarText && <span>{item.label}</span>}
              </Link>
            ))}

            <div className="border-t border-blue-300 my-2"></div>

            {/* Lock icon: यो logout panel toggle गर्ने button */}
            <button
              className="flex items-center gap-2 p-2 rounded transition-colors  cursor-pointer
              text-decoration-none mt-4 w-full"
            >
              <span className="text-xl ">🔐</span>
              {showSidebarText && (
                <span>
                  <LogoutButton />
                </span>
              )}
            </button>
          </nav>

          {/* Logout panel: Lock icon click गर्दा देखिने Logout बटन */}
          {showLogoutPanel && showSidebarText && (
            <div className="mt-2 px-2">
              <LogoutButton />
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {username} 👋
        </h1>
        <p className="text-gray-500 mb-6">Here’s what’s happening today.</p>

        {loadingStats ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Booking</h2>
                <p className="text-3xl font-bold">{stats.totalAppointments}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
