'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Dashboard from './users/page';


// Define the expected structure of the JWT token
interface TokenPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Starting token check...");

    const token = Cookies.get('adminToken');
    console.log("Token found: ", token);

    if (!token) {
      console.log("No token found. Redirecting to login page...");
      router.replace('/auth/adminLogin');
      setLoading(false);
      return; // Important to stop execution after redirect
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      console.log("Decoded token:", decoded);

      if (decoded.role === 'admin') {
        setIsAuthenticated(true);
        console.log("User is an admin.");
      } else if (decoded.role === 'user') {
        console.log("User is a normal user. Redirecting to user dashboard...");
        router.replace('/dashboard/users');
        return; // Stop execution after redirect
      } else {
        console.log("Unknown role. Redirecting to login...");
        router.replace('/auth/adminLogin');
        return;
      }
    } catch (err) {
      console.log("Error decoding token. Redirecting to login...");
      router.replace('/auth/adminLogin');
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center mt-10">
    <Dashboard/>
  </div>;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
