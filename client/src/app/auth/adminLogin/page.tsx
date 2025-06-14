// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// import Cookies from "js-cookie";
// import Image from "next/image";
// import Link from "next/link";

// const AdminLoginPage: React.FC = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       // ✅ Optionally check for admin role
//       // if (data.admin.role !== "admin") {
//       //   toast.error("Access denied: Admins only!");
//       //   setLoading(false);
//       //   return;
//       // }

//       Cookies.set("adminToken", data.token);
//       localStorage.setItem("adminToken", data.token);
//       // localStorage.setItem("admin", JSON.stringify(data.admin));
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           username: data.username,
//           role: data.role,
//         })
//       );

//       toast.success("Login successful! Redirecting...");
//       setTimeout(() => router.push("/dashboard"), 1500);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br to-red-50 flex items-center justify-center px-4">
//       <Toaster position="top-right" />
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-blue-100">
//         <div className="text-center mb-3">
//           {/* <h1 className="text-3xl font-bold text-blue-700 flex pl-14">
//             𝕶𝖗𝖎𝖘𝖍𝖆 <p className="text-red-500">𝕾𝖆𝖉𝖍𝖆𝖓</p>{" "}
//           </h1> */}
//           <Image
//             src="/logo.jpg"
//             alt="Krisha Logo"
//             width={90}
//             height={80}
//             className="mx-auto w-[90px] h-[150px]  object-contain"
//           />

//           <p className="text-sm text-gray-500 ">Please login to continue</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-5">
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
//               autoComplete="email"
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
//               autoComplete="current-password"
//             />
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
//                 Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>

//           <div className="w-full flex justify-end mb-4">
//             <Link
//               href="/auth/forgot-password"
//               className="text-sm text-red-500 hover:underline transition duration-200"
//             >
//               Forgot Password
//             </Link>
//           </div>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           <Link href="/" className="text-blue-500 font-medium hover:underline">
//             ← Back to Home
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;



"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

import {  signInWithPopup } from "firebase/auth";
import { auth,    facebookProvider,     googleProvider } from "@/firebaseconfigurations/config";
import { Facebook } from "lucide-react";
import { FcGoogle } from "react-icons/fc";




const AdminLoginPage: React.FC = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // Form-based login
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



  // -----google login in user --------

  //   const handleFirebaseGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);

  //     const user = result.user;

  //     console.log("User info:", user);

  //     // Add user info to localStorage / redirect as needed
  //     toast.success("Firebase Google login successful!");

  //     setTimeout(() => {
  //       router.push("/Dashboard/adminDashboard"); // ✅ Use Next.js router here
  //     }, 1500);

  //   } catch (error) {
  //     console.error("Firebase error:", error);
  //     toast.error("Firebase Google login failed!");
  //   }
  // };

  //  const handleFirebaseGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     toast.success("  Google login successful!");

  //     // Send to backend to get user role
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/auth/google-login",
  //       {
  //         email: user.email,
  //         name: user.displayName,
  //       }
  //     );

  //     const userRole = data.role;

  //     if (userRole === "admin") {
  //       router.push("/Dashboard/adminDashboard");
  //     } else {
  //       router.push("/Dashboard/userDashboard");
  //     }
  //   } catch (error) {
  //     console.error("Firebase error:", error);
  //     toast.error("Firebase Google login failed!");
  //   }
  // };

  //-----Github login
  
  
  

  const handleFirebaseGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    toast.success("Google login successful!");

    const { data } = await axios.post("http://localhost:5000/api/auth/google-login", {
      email: user.email,
      name: user.displayName,
    });

    // ✅ AuthContext को login function call गर्नुहोस्
    login(data.token, data.role);

    Cookies.set("adminToken", data.token);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

    setTimeout(() => {
      if (data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/users");
      }
    }, 1500);

  } catch (error) {
    console.error("Firebase error:", error);
    toast.error("Firebase Google login failed!");
  }
};



  
 




const handleFirebaseFacebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    toast.success("Facebook login successful!");
 
  console.log("Facebook user:", user); // 👈 Add this line

    const email = user.email || `${user.uid}@facebook.com`;
    const name = user.displayName || "FacebookUser";

    const { data } = await axios.post("http://localhost:5000/api/auth/facebook-login", {
      email,
      name,
    });

    login(data.token, data.role);
    Cookies.set("adminToken", data.token);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

    setTimeout(() => {
      router.push(data.role === "admin" ? "/dashboard" : "/dashboard/users");
    }, 1500);
  } catch (error) {
    console.error("Facebook login failed:", error);
    toast.error("Facebook login failed!");
  }
};





 
  const [showPassword, setShowPassword] = useState(false);
  //--------------------------





  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />
      <div className="card shadow-lg p-3 w-100" style={{ maxWidth: "400px" }}>
          <div className="text-center mb-4   ">
            <Image
             src="/logo.jpg"
             alt="Krisha Logo"
             width={90}
             height={80}
             className="mx-auto w-[90px] h-[150px]  object-contain pt-9"
           />
           <p className="text-sm text-gray-500 mb-9 ">Please login to continue</p>
         </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#999',
                }}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </span>
            </div>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="text-end mb-2">
            <Link href="/auth/forgot-password" className="text-danger text-decoration-none">
              Forgot Password?
            </Link>
          </div>

             <div className="d-flex gap-3 my-3 justify-content-center align-items-center flex-wrap">
                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      onClick={handleFirebaseGoogleLogin}
                      type="button"
                    >
                      <FcGoogle size={24} />
                    </button>
          
                    

                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      onClick={handleFirebaseFacebookLogin}
                      type="button"
                    >
                      <Facebook size={22} />
                    </button>
                  </div>

          <p className="text-center">
            <Link href="/" className="text-primary text-decoration-none">← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default AdminLoginPage;

