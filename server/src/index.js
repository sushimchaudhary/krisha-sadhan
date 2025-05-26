import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './database/connection.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import imageRoutes from './routes/homeImageRoutes.js';
import aboutSliderRoutes from './routes/aboutSliderRoutes.js';

import Auth from './models/authModel.js';

dotenv.config();
dbConnect();

const app = express();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Correct single static folder serve
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// // To serve slider images
// app.use('/uploads/sliders', express.static(path.join(__dirname, 'uploads/sliders')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/image', imageRoutes); // Home page image upload
app.use('/api/about-sliders', aboutSliderRoutes); // About page slider image

// Test route (optional)
app.get("/api/auths", async (req, res) => {
  try {
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Global Error Handler
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
