import express from 'express';
import multer from 'multer';
import Image from '../models/image.js'; // 👈 Add `.js` in ES module

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// 🔽 Upload Route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newImage = new Image({ imageUrl });
    await newImage.save(); // ✅ Save to MongoDB

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});


// 🔽 Fetch Latest Uploaded Image
router.get('/latest', async (req, res) => {
  try {
    const image = await Image.findOne().sort({ createdAt: -1 }); // 👈 or 'uploadedAt'
    if (!image) return res.status(404).json({ message: 'No image found' });

    res.json({ imageUrl: image.imageUrl });
  } catch (error) {
    console.error('Fetch latest image error:', error);
    res.status(500).json({ message: 'Failed to fetch latest image' });
  }
});


// 🔽 Get All Slider Images
router.get('/all', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images); // array of { _id, imageUrl }
  } catch (error) {
    console.error('Fetch all images error:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});



export default router;


// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { uploadImage, getAllImages, deleteImage } from '../controllers/imageController.js';

// const router = express.Router();

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   },
// });

// const upload = multer({ storage });

// // Routes
// router.post('/upload', upload.single('image'), uploadImage);
// router.get('/', getAllImages);
// router.delete('/:id', deleteImage);

// export default router;
