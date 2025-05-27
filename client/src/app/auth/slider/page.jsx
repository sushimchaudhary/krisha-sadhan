'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SliderManager = () => {
  const [slides, setSlides] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  // Fetch slides from backend
  const fetchSlides = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/about-sliders');
      setSlides(res.data);
    } catch (error) {
      console.error('Failed to fetch slides:', error);
      toast.error('Failed to load slides');
    }
  };

  // When user selects files, create previews and store files
  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  // Upload selected files to backend
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select image(s) to upload');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('sliderImages', file));

    try {
      await axios.post('http://localhost:5000/api/about-sliders/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Slider image(s) uploaded successfully!');
      setFiles([]);
      setPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = null;
      fetchSlides();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image(s).');
    }
  };

  // Delete slide by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/about-sliders/${id}`);
      toast.success('Slide deleted successfully');
      setSlides(prev => prev.filter(slide => slide._id !== id));
    } catch (error) {
      console.error('Failed to delete slide:', error);
      toast.error('Failed to delete slide');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-right" />
      
      {/* Upload Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Slider Image Upload (About Page)
        </h2>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFilesChange}
          multiple
          accept="image/*"
          className="block w-full text-gray-700 mb-4
            file:py-2 file:px-4 file:border-0
            file:text-sm file:font-semibold
            file:bg-green-100 file:text-green-700
            hover:file:bg-green-200 cursor-pointer
            rounded-md transition"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Upload Slider Images
        </button>

        {previews.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
            <div className="flex flex-wrap gap-4">
              {previews.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-32 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Manage Slider Images Section */}
      <div className="mt-12">
        <h1 className="text-2xl font-semibold mb-6 text-center">Manage Slider Images</h1>

        {slides.length === 0 ? (
          <p className="text-gray-500 text-center">No slider images uploaded.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {slides.map((slide) => (
              <div key={slide._id} className="relative border rounded shadow hover:shadow-lg transition-shadow duration-200">
                <img
                  src={slide.imageUrl}
                  alt="slider"
                  className="w-full h-40 object-cover rounded-t"
                  loading="lazy"
                />
                <button
                  onClick={() => handleDelete(slide._id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded-full shadow-lg"
                  title="Delete Slide"
                >
                  ✖
                </button>
                <div
                  className="p-2 text-sm text-center truncate select-text"
                  title={slide.imageUrl}
                >
                  {slide.imageUrl}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderManager;
