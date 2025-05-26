import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import {
  uploadSliderImages,
  getSliderImages,
} from '../controllers/aboutSliderController.js';
const router = express.Router();

router.post('/upload', upload.array('sliderImages', 10), uploadSliderImages);
router.get('/', getSliderImages);

export default router;
