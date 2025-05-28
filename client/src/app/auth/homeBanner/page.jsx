
// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';

// const HomeBanner = () => {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [banners, setBanners] = useState([]);

//   // Fetch existing banners from backend
//   const fetchBanners = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/image/all');
//       // Adjust based on your backend response structure
//       // For example, if your API returns { images: [...] }, use res.data.images
//       const data = Array.isArray(res.data) ? res.data : res.data.images || [];
//       setBanners(data);
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//       toast.error('Failed to fetch banners');
//     }
//   };

//   // On component mount, fetch banners once
//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   // Upload selected image
//   const handleImageUpload = async () => {
//     if (!file) {
//       toast.error('Please select an image first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image','media', file);

//     try {
//       const res = await axios.post('http://localhost:5000/api/image/upload', formData);

//       // Assuming the backend returns the uploaded image URL in res.data.imageUrl
//       setImageUrl(res.data.imageUrl || '');

//       toast.success('Banner Image uploaded successfully!');

//       // Reset file input and file state so user can upload again
//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = null;

//       // Refresh the banners list to include new image
//       fetchBanners();
//     } catch (error) {
//       console.error('Banner Image Upload Error:', error);
//       toast.error('Failed to upload image.');
//     }
//   };

//   // Delete image by ID
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
//     <div className="max-w-7xl mx-auto p-6">
//       <Toaster position="top-right" />

//       {/* Upload Section */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
//           Home Banner Upload
//         </h2>

//         <input
//           type="file"
//           ref={fileInputRef}
//           accept="image/*"
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
//             hover:file:bg-blue-200 cursor-pointer
//             rounded-md transition"
//         />

//         <button
//           onClick={handleImageUpload}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
//         >
//           Upload Banner Image
//         </button>
//       </div>

//       {/* Manage Banner Images Section */}
//       <div className="mt-12">
//         <h1 className="text-2xl font-semibold mb-6 text-center">Manage Banner Images</h1>

//         {banners.length === 0 ? (
//           <p className="text-gray-500 text-center">No banner images uploaded.</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {banners.map((banner) => (
//               <div key={banner._id} className="relative border rounded shadow hover:shadow-lg transition-shadow duration-200">
//                 <img
//                   src={banner.imageUrl}
//                   alt="banner"
//                   className="w-full h-40 object-cover rounded-t"
//                   loading="lazy"
//                 />
//                 <button
//                   onClick={() => handleDelete(banner._id)}
//                   className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded-full shadow-lg"
//                   title="Delete Banner"
//                 >
//                   ✖
//                 </button>
//                 <div
//                   className="p-2 text-sm text-center truncate select-text"
//                   title={banner.imageUrl}
//                 >
//                   {banner.imageUrl}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
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
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/image/all');
      const data = Array.isArray(res.data) ? res.data : res.data.images || [];
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to fetch banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageUpload = async () => {
    if (!file) {
      toast.error('Please select a file (image or video)');
      return;
    }

    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/api/image/upload', formData);
      toast.success(' uploaded successfully!');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      fetchBanners();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/image/${id}`);
      toast.success('File deleted');
      fetchBanners();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-right" />

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Home Banner Upload
        </h2>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
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
            hover:file:bg-blue-200 cursor-pointer
            rounded-md transition"
        />

        <button
          onClick={handleImageUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Upload
        </button>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Manage Uploaded Files</h1>

        {banners.length === 0 ? (
          <p className="text-gray-500 text-center">No files uploaded.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="relative border rounded shadow hover:shadow-lg transition-shadow duration-200"
              >
                {isVideo(banner.imageUrl) ? (
                  <video
                    src={banner.imageUrl}
                    controls
                    className="w-full h-40 object-cover rounded-t"
                  />
                ) : (
                  <img
                    src={banner.imageUrl}
                    alt="banner"
                    className="w-full h-40 object-cover rounded-t"
                    loading="lazy"
                  />
                )}

                <button
                  onClick={() => handleDelete(banner._id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded-full shadow-lg"
                  title="Delete"
                >
                  ✖
                </button>
                <div
                  className="p-2 text-sm text-center truncate select-text"
                  title={banner.imageUrl}
                >
                  {banner.imageUrl}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
