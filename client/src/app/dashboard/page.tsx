"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/component/LogoutButton";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserModal from "@/component/UserModel";

interface TokenPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [username, setUsername] = useState("Admin");
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const decoded = jwtDecode<TokenPayload>(token);
        const adminId = decoded.id;

        const res = await fetch(
          `http://localhost:5000/api/auth/get-admin/${adminId}`
        );
        const data = await res.json();

        if (data.username) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchAdminData();
    fetchStats();
  }, []);

  const handleFetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      setUsers(data);
      setShowUserModal(true);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-100 to-blue-50 shadow-lg hidden md:flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800">Admin Panel</h2>
            </div>
            <nav className="mt-4 px-4 space-y-3 text-sm text-black font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/auth/admin/addDoctors"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                🩺 Doctors
              </Link>
              <Link
                href="/auth/admin/appointments"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                📅 Appointment Scheduler
              </Link>
              <Link
                href="/auth/admin/addNews"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                📰 News
              </Link>
              <Link
                href="/auth/adminRegister"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                ➕ Register Admin
              </Link>
            </nav>
          </div>
          <div className="px-6 py-4 border-t border-blue-200">
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {username} 👋
            </h1>
            <p className="text-gray-500">Here’s what’s happening today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              onClick={handleFetchUsers}
              className="bg-blue-100 cursor-pointer hover:shadow-lg transition"
            >
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Total Doctors</h2>
                <p className="text-3xl font-bold">{stats.totalDoctors}</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Appointments</h2>
                <p className="text-3xl font-bold">{stats.totalAppointments}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <UserModal users={users} onClose={() => setShowUserModal(false)} />
      )}
    </div>
  );
}
