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
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config(); // Load .env

dbConnect();

const app = express();



// To resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(path.join("public/uploads")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/news', newsRoutes);

app.use('/api/admin', adminRoutes);

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// ✅ Example route
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalUsers: 10,
    totalDoctors: 5,
    totalAppointments: 20,
  });
});

// Error Handling Middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
