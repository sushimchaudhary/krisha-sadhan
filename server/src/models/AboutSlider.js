import mongoose from 'mongoose';

const AboutSliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const AboutSlider = mongoose.model('AboutSlider', AboutSliderSchema);
export default AboutSlider;
