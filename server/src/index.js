
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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
import Auth from './models/authModel.js';
import imageRoutes from './routes/imageRoutes.js';
import aboutSliderRoutes from './routes/aboutSliderRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import passport from 'passport';
import session from 'express-session';
import jwt from "jsonwebtoken";

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
//------
app.use(session ({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())
// Routes

// app.get('/api/superadmin/dashboard', protectSuperAdmin, authRoutes); // protected route


app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/image', imageRoutes); // Home page image upload
app.use('/api/about-sliders', aboutSliderRoutes); // About page slider image
app.use('/api/services', serviceRoutes);
app.use("/api/bookings", bookingRoutes);


// Error Handling Middleware
app.use(errorMiddleware);

// Test route (optional)
app.get("/api/auths", async (req, res) => {
  try {
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// Google OAuth login endpoint
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback endpoint
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    // Create JWT token after successful login
    const user = req.user;
    const token = jwt.sign(
      { id: user.googleId, email: user.email, name: user.name, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Redirect to frontend with token (as query param or better use cookies)
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});