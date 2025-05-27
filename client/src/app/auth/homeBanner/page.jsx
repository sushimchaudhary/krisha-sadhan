// 'use client';

// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';

// const HomeBanner = () => {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleImageUpload = async () => {
//     if (!file) {
//       toast.error("Please select an image first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/image/upload", formData);
//       setImageUrl(res.data.imageUrl);
//       toast.success("Banner Image uploaded successfully!");
//     } catch (error) {
//       console.error("Banner Image Upload Error:", error);
//       toast.error("Failed to upload image.");
//     }
//   };

//   return (
//     <div className="mt-8 bg-white p-4 rounded shadow-md">
//       <Toaster position="top-right" />
//       <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//           Upload Home Banner Image
//         </h2>

//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             const files = e.target.files;
//             if (files && files.length > 0) {
//               setFile(files[0]);
//             }
//           }}
//           className="block w-full text-gray-700 mb-4
//             file:py-2 file:px-4 file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-100 file:text-blue-700
//             hover:file:bg-blue-200 cursor-pointer"
//         />

//         <button
//           onClick={handleImageUpload}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
//         >
//           Upload
//         </button>
//       </div>

//       {imageUrl && (
//         <div className="mt-4 text-center">
//           <p className="text-sm text-gray-600 mb-2">Preview:</p>
//           <img src={imageUrl} alt="Uploaded" className="w-72 rounded border mx-auto" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeBanner;



// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';

// const HomeBanner = () => {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [banners, setBanners] = useState([]);

//   // Fetch existing banners
//   const fetchBanners = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/image/all");
//       setBanners(res.data.images); // Adjust key as per your backend
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       toast.error('Failed to fetch banners');
//     }
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   // Upload new image
//   const handleImageUpload = async () => {
//     if (!file) {
//       toast.error('Please select an image first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await axios.post('http://localhost:5000/api/image/upload', formData);
//       setImageUrl(res.data.imageUrl);
//       toast.success('Banner Image uploaded successfully!');
//       setFile(null);
//       fileInputRef.current.value = null;
//       fetchBanners();
//     } catch (error) {
//       console.error('Banner Image Upload Error:', error);
//       toast.error('Failed to upload image.');
//     }
//   };

//   // Delete image
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/image/${id}`);
//       toast.success('Image deleted');
//       fetchBanners();
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error('Failed to delete image');
//     }
//   };

//   return (
//     <div className="mt-8 bg-white p-4 rounded shadow-md">
//       <Toaster position="top-right" />
//       <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Home Banner Image</h2>

//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             const files = e.target.files;
//             if (files && files.length > 0) {
//               setFile(files[0]);
//             }
//           }}
//           className="block w-full text-gray-700 mb-4
//             file:py-2 file:px-4 file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-100 file:text-blue-700
//             hover:file:bg-blue-200 cursor-pointer"
//         />

//         <button
//           onClick={handleImageUpload}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
//         >
//           Upload
//         </button>
//       </div>

//       {banners.length > 0 && (
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {banners.map((banner) => (
//             <div key={banner._id} className="border rounded shadow p-2 text-center">
//               <img src={banner.imageUrl} alt="banner" className="w-full h-40 object-cover rounded" />
//               <button
//                 onClick={() => handleDelete(banner._id)}
//                 className="mt-2 text-red-600 hover:underline text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeBanner;



'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const HomeBanner = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [banners, setBanners] = useState([]); // empty array to avoid undefined errors

  // Fetch banners from backend
  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/image/all");
      setBanners(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to fetch banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Upload image handler
  const handleImageUpload = async () => {
    if (!file) {
      toast.error('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/image/upload", formData);
      setImageUrl(res.data.imageUrl);
      toast.success("Banner Image uploaded successfully!");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      fetchBanners(); // refresh banner list
    } catch (error) {
      console.error("Banner Image Upload Error:", error);
      toast.error("Failed to upload image.");
    }
  };

  // Delete banner handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/image/${id}`);
      toast.success('Image deleted');
      fetchBanners();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="mt-8 bg-white p-4 rounded shadow-md">
      <Toaster position="top-right" />
      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Home Banner Image</h2>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setFile(files[0]);
            }
          }}
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

        {/* Image preview */}
        {imageUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img src={imageUrl} alt="Uploaded" className="w-72 rounded border mx-auto" />
          </div>
        )}
      </div>

      {/* Display existing banners */}
      {banners && banners.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner._id} className="border rounded shadow p-2 text-center">
              <img src={banner.imageUrl} alt="banner" className="w-full h-40 object-cover rounded" />
              <button
                onClick={() => handleDelete(banner._id)}
                className="mt-2 text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBanner;
