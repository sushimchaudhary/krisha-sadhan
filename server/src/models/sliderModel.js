import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  
});

const Slide = mongoose.model('Slide', slideSchema);
export default Slide;
