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
    cb(null, 'public/uploads/'); // Save media to public/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only image/video formats
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post('/upload', upload.single('media'), uploadImage);
router.get('/all', getAllImages);
router.get('/latest', getLatestImage);
router.delete('/:id', deleteImage);

export default router;
