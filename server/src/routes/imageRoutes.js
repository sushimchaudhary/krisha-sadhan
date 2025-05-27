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

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.get('/all', getAllImages);
router.get('/latest', getLatestImage);
router.delete('/:id', deleteImage);

export default router;

