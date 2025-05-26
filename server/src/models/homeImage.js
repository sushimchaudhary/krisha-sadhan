import mongoose from 'mongoose';

const homeImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', homeImageSchema);

export default Image;
