import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import {
  uploadSliderImages,
  getSliderImages,
  deleteSliderById,
  
} from '../controllers/aboutSliderController.js';
import AboutSlider from '../models/AboutSlider.js';
const router = express.Router();

router.post('/upload', upload.array('sliderImages', 10), uploadSliderImages);
router.get('/', getSliderImages);


router.get('/about-sliders', async (req, res) => {
  const slides = await AboutSlider.find({});
  res.json(slides);
});
router.delete('/:id', deleteSliderById);


export default router;
