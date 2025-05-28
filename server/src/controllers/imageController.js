// import Image from '../models/Image.js';
// import path from 'path';
// import fs from 'fs/promises';
// import { fileURLToPath } from 'url';

// // For ES Modules __dirname replacement
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Upload image
// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image file provided' });
//     }

//     const image = new Image({
//       imageUrl: `/uploads/${req.file.filename}`,
//     });

//     const savedImage = await image.save();
//     res.status(201).json({ message: 'Image uploaded', imageUrl: savedImage.imageUrl });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Image upload failed' });
//   }
// };

// // Get all images
// export const getAllImages = async (req, res) => {
//   try {
//     const images = await Image.find().sort({ createdAt: -1 });
//     res.status(200).json({ images });
//   } catch (error) {
//     console.error('Fetch error:', error);
//     res.status(500).json({ message: 'Failed to fetch images' });
//   }
// };

// // Delete image
// export const deleteImage = async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     if (!image) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     const imagePath = path.join(__dirname, '..', 'public', image.imageUrl);
//     await fs.unlink(imagePath).catch((err) => {
//       console.warn('Image file not found or already deleted:', err.message);
//     });

//     await Image.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Image deleted' });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({ message: 'Failed to delete image' });
//   }
// };


import Image from '../models/image.js';

// 📤 Upload image
export const uploadImage = async (req, res) => {
  try {
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const newImage = new Image({ imageUrl });
    await newImage.save();
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload image or video' });
  }
};

// 🔽 Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error('Fetch all images error:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

// 🔝 Get latest image
export const getLatestImage = async (req, res) => {
  try {
    const image = await Image.findOne().sort({ createdAt: -1 });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json({ imageUrl: image.imageUrl });
  } catch (error) {
    console.error('Fetch latest image error:', error);
    res.status(500).json({ message: 'Failed to fetch latest image' });
  }
};

// ❌ Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};

