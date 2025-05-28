'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('adminToken'); 
    localStorage.removeItem('adminToken'); 
    toast.success('Logged out successfully!');
    setTimeout(() => {
      router.push('/auth/adminLogin');
    }, 1000);
  };

//   const handleLogout = async () => {
//   try {
//     // backend logout call (active: false बनाउने)
//     await axios.post('/api/auth/Adminlogout', {}, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
//       },
//     });

//     // client-side cleanup
//     Cookies.remove('adminToken');
//     localStorage.removeItem('adminToken');
//     toast.success('Logged out successfully!');

//     setTimeout(() => {
//       router.push('/auth/adminLogin');
//     }, 1000);
//   } catch (error) {
//     console.error('Logout failed:', error);
//     toast.error('Logout failed!');
//   }
// };


  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded shadow"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
