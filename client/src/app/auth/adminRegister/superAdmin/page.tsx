"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";
// import Cookies from "js-cookie";

const AdminRegisterPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [loading, setLoading] = useState(false);

  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number, and symbol"
      );
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        role,
      });

      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/auth/adminLogin"), 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/auth/me', {
  //         withCredentials: true, // if using cookie-based auth
  //       });

  //       if (res.data.role !== 'admin') {
  //         router.replace('/not-authorized');
  //       }
  //     } catch (error) {
  //       router.replace('/not-authorized');
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   const verifyAdmin = async () => {
  //     const token = Cookies.get("adminToken");
  //     if (!token) {
  //       router.push("/not-authorized");
  //       return;
  //     }

  //     try {
  //       const decoded = jwtDecode<TokenPayload>(token);

  //       if (decoded.role !== "admin") {
  //         router.push("/not-authorized");
  //       }
  //     } catch (err) {
  //       router.push("/not-authorized");
  //     }
  //   };

  //   verifyAdmin();
  // }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.jpg"
            alt="Krisha Logo"
            width={90}
            height={150}
            className="mx-auto w-[90px] h-[150px]  object-contain"
          />
          <h1 className="text-3xl font-bold text-blue-700">
            Admin Registration
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Create your account to manage the system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="admin123"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="admin">Admin</option>

              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-500 hover:bg-red-600 transition text-white font-medium py-2 rounded flex justify-center items-center gap-2`}
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Register...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/adminLogin"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
          Or go to{" "}
          <Link
            href="/dashboard"
            className="text-red-500 font-medium hover:underline flex items-center gap-1"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegisterPage;

// 'use client';

// import React, { useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { HomeIcon } from 'lucide-react';
// import Head from 'next/head';

// const AdminRegisterPage: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const role = 'admin'; // fixed role

//   const isStrongPassword = (password: string) => {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!isStrongPassword(password)) {
//       toast.error('Password must be 8+ chars with uppercase, lowercase, number, and symbol');
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         username,
//         email,
//         password,
//         role,
//       });

//       toast.success('Registration successful! Please login.');
//       setTimeout(() => router.push('/auth/adminLogin'), 1500);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Registration failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* 🚫 Hide from search engines */}
//       <Head>
//         <meta name="robots" content="noindex,nofollow" />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
//         <Toaster position="top-right" />
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
//           <div className="flex flex-col items-center mb-6">
//             <Image src="/logo.png" alt="Hospital Logo" width={64} height={64} className="mb-3" />
//             <h1 className="text-3xl font-bold text-blue-700">Admin Registration</h1>
//             <p className="text-sm text-gray-500 mt-1 text-center">
//               Create your account to manage the system
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//               <input
//                 type="text"
//                 placeholder="admin123"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="admin@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="********"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Hidden input to keep role as admin only */}
//             <input type="hidden" value="admin" name="role" />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 rounded-lg"
//             >
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </form>

//           <p className="mt-5 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link href="/auth/adminLogin" className="text-blue-600 font-medium hover:underline">
//               Login here
//             </Link>
//           </p>
//           <p className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
//             Or go to{' '}
//             <Link href="/dashboard" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
//               <HomeIcon className="h-5 w-5" />
//               Dashboard
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminRegisterPage;
