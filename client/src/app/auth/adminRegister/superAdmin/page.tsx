// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { HomeIcon } from "lucide-react";
// // import Cookies from "js-cookie";

// const AdminRegisterPage: React.FC = () => {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin"); // default role
//   const [loading, setLoading] = useState(false);

//   const isStrongPassword = (password: string) => {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email address");
//       setLoading(false);
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       toast.error(
//         "Password must be 8+ chars with uppercase, lowercase, number, and symbol"
//       );
//       setLoading(false);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         username,
//         email,
//         password,
//         role,
//       });

//       toast.success("Registration successful! Please login.");
//       setTimeout(() => router.push("/auth/adminLogin"), 1500);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Registration failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const res = await axios.get('http://localhost:5000/api/auth/me', {
//   //         withCredentials: true, // if using cookie-based auth
//   //       });

//   //       if (res.data.role !== 'admin') {
//   //         router.replace('/not-authorized');
//   //       }
//   //     } catch (error) {
//   //       router.replace('/not-authorized');
//   //     }
//   //   };

//   //   fetchUser();
//   // }, []);

//   // useEffect(() => {
//   //   const verifyAdmin = async () => {
//   //     const token = Cookies.get("adminToken");
//   //     if (!token) {
//   //       router.push("/not-authorized");
//   //       return;
//   //     }

//   //     try {
//   //       const decoded = jwtDecode<TokenPayload>(token);

//   //       if (decoded.role !== "admin") {
//   //         router.push("/not-authorized");
//   //       }
//   //     } catch (err) {
//   //       router.push("/not-authorized");
//   //     }
//   //   };

//   //   verifyAdmin();
//   // }, [router]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 flex items-center justify-center py-1">
//       <Toaster position="top-right" />
//       <div className="w-full max-w-md bg-white  p-4  rounded-2xl shadow-2xl border border-blue-100">
//         <div className="flex flex-col items-center mb-0">
//           <Image
//             src="/logo.jpg"
//             alt="Krisha Logo"
//             width={90}
//             height={150}
//             className="mx-auto w-[90px] h-[80px]  object-contain"
//           />

//             {/* <h1 className="text-3xl font-bold text-blue-700 mb-0">
//               welcom to Registration
//             </h1> */}
//             <p className=" font-bold text-gray-500 mt-0 text-center">
//               Please sign in to access your account
//             </p>

//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="admin123"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="admin@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="********"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Role
//             </label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="admin">Admin</option>

//               <option value="user">User</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-red-500 hover:bg-red-600 transition text-white font-medium py-2 rounded flex justify-center items-center gap-2`}
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="w-5 h-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                   ></path>
//                 </svg>
//                 Register...
//               </>
//             ) : (
//               "Register"
//             )}
//           </button>
//         </form>

//         <p className="mt-1 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             href="/auth/adminLogin"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Login here
//           </Link>
//         </p>
//         <p className="mt-2 text-center text-sm text-gray-600 flex justify-center items-center gap-1">
//           Or go to{" "}
//           <Link
//             href="/"
//             className="text-red-500 font-medium hover:underline flex items-center gap-1"
//           >
//             <HomeIcon className="h-5 w-5" />
//             Home
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminRegisterPage;

"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon, HomeIcon } from "lucide-react";

import { FcGoogle } from "react-icons/fc"; // Google Icon from react-icons

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  githubProvider,
  googleProvider,
} from "@/firebaseconfigurations/config";

const AdminRegisterPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

  const [showPassword, setShowPassword] = useState(false);
  //--------------------------

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <Toaster position="top-right" />
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-4   ">
          <Image
            src="/logo.jpg"
            alt="Krisha Logo"
            width={90}
            height={80}
            className="mx-auto w-[90px] h-[150px]  object-contain pt-9"
          />
          <p className="text-sm text-gray-500 mb-9 ">
            {" "}
            Please sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/adminLogin" className="text-primary fw-medium text-decoration-none " >
            Login here
          </Link>
        </p>

        <p className="text-center">
          Or go to{" "}
          <Link
            href="/"
            className="text-danger fw-medium d-inline-flex align-items-center text-decoration-none "
          >
            <HomeIcon className="me-1" size={18} />
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
