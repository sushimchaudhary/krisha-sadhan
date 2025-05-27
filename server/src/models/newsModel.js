// models/newsModel.js
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true }, // store image path
}, { timestamps: true });

export default mongoose.model("News", newsSchema);