// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import LogoutButton from "@/component/LogoutButton";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import UserModal from "@/component/UserModel";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// interface TokenPayload {
//   id: string;
//   role: string;
//   iat?: number;
//   exp?: number;
// }

// interface User {
//   username: string;
//   email: string;
//   role: string;
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalDoctors: 0,
//     totalAppointments: 0,
//   });

//   const [username, setUsername] = useState("Admin");
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [users, setUsers] = useState<User[]>([]);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const token = Cookies.get("adminToken");
//         if (!token) {
//           router.push("/auth/adminLogin");
//           return;
//         }

//         const decoded = jwtDecode<TokenPayload>(token);
//         const adminId = decoded.id;

//         const res = await fetch(
//           `http://localhost:5000/api/auth/get-admin/${adminId}`
//         );

//         if (!res.ok) {
//           router.push("/auth/adminLogin");
//           return;
//         }

//         const data = await res.json();

//         if (data.username) {
//           setUsername(data.username);
//         }
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       }
//     };

//     const fetchStats = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/admin/stats");
//         if (!res.ok) {
//           console.error("Failed to fetch stats");
//           return;
//         }
//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Failed to fetch stats", error);
//       }
//     };

//     fetchAdminData();
//     fetchStats();
//   }, [router]);

//   const handleFetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/users");
//       const data = await res.json();

//       if (!Array.isArray(data.users)) {
//         toast.error("Unexpected data format received.");
//         return;
//       }

//       setUsers(data.users);
//       setShowUserModal(true);
//     } catch (error) {
//       toast.error("An error occurred while fetching users.");
//       console.error("Failed to fetch users", error);
//     }
//   };

//   const handleDeleteUser = async (user: User) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/auth/users/${user.email}`);
//       setUsers((prev) => prev.filter((u) => u.email !== user.email));
//       toast.success(`${user.username} deleted successfully`);
//     } catch (error) {
//       console.error("Failed to delete user", error);
//       toast.error("Failed to delete user");
//     }
//   };

//   const handleUpdateUser = async (updatedUser: User) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/auth/users/${updatedUser.email}`,
//         updatedUser
//       );
//       setUsers((prev) =>
//         prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
//       );
//       toast.success(`${updatedUser.username} updated successfully`);
//     } catch (error) {
//       console.error("Update user error:", error);
//       toast.error("Failed to update user");
//     }
//   };

//   return (
//     <div className="flex flex-col bg-gray-50 min-h-screen">
//       <Toaster position="top-right" reverseOrder={false} />
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gradient-to-b from-blue-100 to-blue-50 shadow-lg hidden md:flex flex-col justify-between">
//           <div>
//             <div className="px-6 py-4 border-b border-blue-200">
//               <h2 className="text-2xl font-bold text-blue-800">Admin Panel</h2>
//             </div>
//             <nav className="mt-4 px-4 space-y-3 text-sm text-black font-medium">
//               <Link
//                 href="/dashboard"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 📊 Dashboard
//               </Link>
//               <Link
//                 href="/auth/admin/addDoctors"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 🩺 Doctors
//               </Link>
//               <Link
//                 href="/auth/admin/appointments"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 📅 Appointment Scheduler
//               </Link>
//               <Link
//                 href="/auth/admin/addNews"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 📰 News
//               </Link>
//               <Link
//                 href="/auth/slider"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 sliderImages
//               </Link>
//               <Link
//                 href="/auth/admin/addServices"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 Services
//               </Link>
//               <Link
//                 href="/auth/homeBanner"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 Home Banner
//               </Link>
//               <Link
//                 href="/auth/adminRegister/superAdmin"
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-200 transition-all"
//               >
//                 ➕ Register Admin
//               </Link>
//             </nav>
//           </div>
//           <div className="px-6 py-4 border-t border-blue-200">
//             <LogoutButton />
//           </div>
//         </aside>

//         {/* Main Content */}-------
//         <main className="flex-1 p-6">
//           <div className="mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Welcome, {username} 👋
//             </h1>
//             <p className="text-gray-500">Here’s what’s happening today.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Card
//               onClick={handleFetchUsers}
//               className="bg-blue-100 cursor-pointer hover:shadow-lg transition"
//             >
//               <CardContent className="p-6">
//                 <h2 className="text-lg text-gray-700">Total Users</h2>
//                 <p className="text-3xl font-bold">{stats.totalUsers}</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-green-100">
//               <CardContent className="p-6">
//                 <h2 className="text-lg text-gray-700">Total Doctors</h2>
//                 <p className="text-3xl font-bold">{stats.totalDoctors}</p>
//               </CardContent>
//             </Card>
//             <Card className="bg-yellow-100">
//               <CardContent className="p-6">
//                 <h2 className="text-lg text-gray-700">Appointments</h2>
//                 <p className="text-3xl font-bold">{stats.totalAppointments}</p>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>

//       {/* User Modal */}
//       {showUserModal && (
//         <UserModal
//           users={users}
//           onClose={() => setShowUserModal(false)}
//           onDeleteUser={handleDeleteUser}
//           onUpdateUser={handleUpdateUser}
//         />
//       )}

//       //---
//     </div>
//   );
// }














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
import { usePathname } from 'next/navigation';

// import LogoutButton from './LogoutButton';

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
  const pathname = usePathname();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });

  const [username, setUsername] = useState("Admin");
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);


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


  const links = [
    { href: '/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/auth/admin/addTours', icon: '🚗', label: 'Tour' },
    { href: '/auth/admin/appointments', icon: '📅', label: 'Booking' },
    { href: '/auth/admin/addNews', icon: '📰', label: 'News' },
    { href: '/auth/slider', icon: '🖼️', label: 'About Images' },
    { href: '/auth/admin/addServices', icon: '💼', label: 'Services' },
    { href: '/auth/homeBanner', icon: '🏠', label: 'Banner Image' },
    { href: '/auth/adminRegister/superAdmin', icon: '➕', label: 'Register Admin' },
  ]
  return (
    <>


      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - Always Visible, Hover Expandable */}
        <aside className="pb-0 group fixed top-17 left-0 z-40 h-[100vh] w-[72px] hover:w-64 bg-gradient-to-b from-blue-100 to-blue-50 shadow-lg transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden">

          {/* Sidebar Header */}
          <div className="py-4">
            <div className="px-2 py-3 border-b border-blue-200 flex items-center gap-2">
              <span className="text-2xl">🛠️</span>
              <h2 className="text-xl font-bold text-blue-800 whitespace-nowrap opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                Admin Panel
              </h2>
            </div>

            {/* Navigation Links */}
            <nav className="mt-1 mb-2  px-2   text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 text-decoration-none py-2 rounded-lg transition-all ${pathname === link.href
                    ? 'bg-blue-300 text-blue-900'
                    : 'text-black hover:bg-blue-200'
                    }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="whitespace-nowrap opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}

            </nav>
            <div className="d-flex items-center px-4 py-2 border-t border-blue-200 gap-3 left-0">
              <span className="text-xl">🔐</span>

              <div className="opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                <LogoutButton />
              </div>
            </div>

          </div>


        </aside>

        {/* Main Content Area - Adjust margin for sidebar */}
        <main className="flex-1 ml-[70px] group-hover:ml-64 transition-all duration-300 p-4 sm:p-6">
          <div className="mb-6 pl-20">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome, {username} 👋</h1>
            <p className="text-gray-500">Here’s what’s happening today.</p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 pl-20 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              onClick={handleFetchUsers}
              className="bg-blue-100 cursor-pointer hover:shadow-lg transition"
            >
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </CardContent>
            </Card>

            {/* <Card className="bg-green-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Total Doctors</h2>
                <p className="text-3xl font-bold">{stats.totalDoctors}</p>
              </CardContent>
            </Card> */}

            <Card className="bg-yellow-100">
              <CardContent className="p-6">
                <h2 className="text-lg text-gray-700">Booking </h2>
                <p className="text-3xl font-bold">{stats.totalAppointments}</p>
              </CardContent>
            </Card>
          </div>
        </main>
        
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



    </>
  );
}