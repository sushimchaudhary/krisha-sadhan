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


import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  uploadImage,
  getAllImages,
  getLatestImage,
  deleteImage
} from '../controllers/imageController.js';

const router = express.Router();

// 📦 Multer को config: कुन folder मा image राख्ने र के नाम दिने
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'), // यो path मा फोटोहरू जान्छ
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 🛣 Routes
router.post('/upload', upload.single('image'), uploadImage); // एक फोटो upload
router.get('/all', getAllImages); // सबै फोटोहरू ल्याउने
router.get('/latest', getLatestImage); // भर्खरको फोटो
router.delete('/:id', deleteImage); // delete गर्ने

export default router;
