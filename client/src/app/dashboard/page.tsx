"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/component/LogoutButton";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserModal from "@/component/UserModel";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


interface TokenPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface User {
  username: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [username, setUsername] = useState("Admin");
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [file, setFile] = useState<File | null>(null);
const [imageUrl, setImageUrl] = useState<string>("");

  const router = useRouter();
  

  

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (!token) {
          console.log("No token found");
          router.push("/auth/adminLogin");
          return;
        }

        const decoded = jwtDecode<TokenPayload>(token);
        const adminId = decoded.id;

        const res = await fetch(
          `http://localhost:5000/api/auth/get-admin/${adminId}`
        );

        if (!res.ok) {
          console.error("Failed to fetch admin data, status:", res.status);
          router.push("/auth/adminLogin");
          return;
        }

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
        if (!res.ok) {
          console.error("Failed to fetch stats, status:", res.status);
          return;
        }
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    fetchAdminData();
    fetchStats();
  }, [router]);

  const handleFetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/users");
      const data = await res.json();

      if (!Array.isArray(data.users)) {
        console.error("Users data is not an array:", data);
        alert("Unexpected data format received.");
        return;
      }

      setUsers(data.users);
      setShowUserModal(true);
    } catch (error) {
      console.error("Failed to fetch users", error);
      alert("An error occurred while fetching users.");
    }
  };

  const handleDeleteUser = async (user: User) => {
    console.log("Deleting user", user);
    try {
      await axios.delete(`http://localhost:5000/api/auth/users/${user.email}`);
      setUsers((prev) => prev.filter((u) => u.email !== user.email));
      alert(`${user.username} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user");
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/users/${updatedUser.email}`,
        updatedUser
      );
      setUsers((prev) =>
        prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
      );
      alert(`${updatedUser.username} updated successfully`);
    } catch (error) {
      alert("Failed to update user");
    }
  };

//  banner Upload
  // const handleImageUpload = async () => {
  //   if (!file) {
  //     toast.error("Please select an image first");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/image/upload",
  //       formData
  //     );
  //     setImageUrl(res.data.imageUrl);
  //     toast.success("Banner Image uploaded successfully!");
  //   } catch (error) {
  //     console.error("Banner Image Upload Error:", error);
  //     toast.error("Failed to upload image.");
  //   }
  // };


 

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
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
                href="/auth/slider"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                 sliderImages
              </Link>

              <Link
                href="/auth/admin/addServices"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                 Services
              </Link>
              <Link
                href="/auth/homeBanner"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
              >
                 Home Banner
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
{/* 
          Upload home banner  */}

          {/* <div className="mt-8 bg-white p-4 rounded shadow-md">
            <Toaster position="top-right" />
            <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Upload Home Banner Image
              </h2>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-gray-700 mb-4
               file:py-2 file:px-4 file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-100 file:text-blue-700
               hover:file:bg-blue-200 cursor-pointer"
              />

              <button
                onClick={handleImageUpload}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
              >
                Upload
              </button>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-72 rounded border"
                />
              </div>
            )}
          </div> */}

         
        </main>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          users={users}
          onClose={() => setShowUserModal(false)}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </div>
  );
}
