'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/component/LogoutButton';



export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });
  const [username, setUsername] = useState('Admin');
  const [loadingStats, setLoadingStats] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch dashboard stats from backend
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await fetch('http://localhost:5000/api/admin/stats');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoadingStats(false);
      }
    };

    // Load user username from localStorage
    const storedAuth = localStorage.getItem('user');
    if (storedAuth) {
      try {
        const user = JSON.parse(storedAuth);
        setUsername(user.username || 'User');
      } catch {
        setUsername('User');
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col  bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-100 to-blue-50 shadow-lg hidden md:flex flex-col justify-between">
          <div>
            {/* Panel Title */}
            <div className="px-6 py-4 border-b border-blue-200">
              <h2 className="text-2xl font-bold text-blue-800">User Panel</h2>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4 px-4 space-y-3 text-sm text-black font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-black text-decoration-none hover:bg-blue-200 transition-all duration-200"
              >
                📊 Dashboard
              </Link>
              <Link
                href="/Doctor"
                className="flex items-center gap-2 px-3 py-2 text-black text-decoration-none rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                🩺 Doctors
              </Link>
              <Link
                href="/auth/admin/appointments"
                className="flex items-center gap-2 px-3 py-2 text-black text-decoration-none rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                📅 Appointment Scheduler
              </Link>
              <Link
                href="/News"
                className="flex items-center gap-2 px-3 py-2 text-black text-decoration-none rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                📰 News
              </Link>
              {/* <Link
                href="/auth/adminRegister"
                className="flex items-center gap-2 px-3 py-2 text-black text-decoration-none  rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                ➕ Register Admin
              </Link> */}
            </nav>
          </div>

          {/* Logout Section */}
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
          )}
        </main>
      </div>
      
    </div>
  );
}
