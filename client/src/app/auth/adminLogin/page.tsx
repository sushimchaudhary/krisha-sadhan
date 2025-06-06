"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ Optionally check for admin role
      // if (data.admin.role !== "admin") {
      //   toast.error("Access denied: Admins only!");
      //   setLoading(false);
      //   return;
      // }

      Cookies.set("adminToken", data.token);
      localStorage.setItem("adminToken", data.token);
      // localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          role: data.role,
        })
      );

      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-blue-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
        <div className="text-center mb-6">
          {/* <h1 className="text-3xl font-bold text-blue-700 flex pl-14">
            𝕶𝖗𝖎𝖘𝖍𝖆 <p className="text-red-500">𝕾𝖆𝖉𝖍𝖆𝖓</p>{" "}
          </h1> */}
          <Image
            src="/logo.jpg"
            alt="Krisha Logo"
            width={90}
            height={150}
            className="mx-auto w-[90px] h-[150px]  object-contain"
          />

          <p className="text-sm text-gray-500 ">Please login to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="w-full flex justify-end mb-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-red-500 hover:underline transition duration-200"
            >
              Forgot Password
            </Link>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/" className="text-blue-500 font-medium hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
