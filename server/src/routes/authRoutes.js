import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, getAdminById, getUserById, getAllUsers, deleteUserByEmail, updateUserByEmail, login, logout, forgotPassword, resetPassword, googleLogin } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
// import { protectSuperAdmin } from '../middlewares/protectSuperAdmin.js';

import passport from 'passport';
import Auth from '../models/authModel.js';
import jwt from "jsonwebtoken";

import { protect } from '../middlewares/protectSuperAdmin.js';


const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/get-admin/:id', getAdminById); // ✅ New route
router.get('/get-user/:id', getUserById);
router.get('/users', getAllUsers);
router.delete("/users/:email",protect, deleteUserByEmail);
router.put("/users/:email", updateUserByEmail);
router.post('/login', login);
router.post('/logout', authenticateToken, logout)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// In authRoutes.js or similar

router.get('/users', async (req, res) => {
  try {
    const users = await Auth.find({ role: 'user' }); // या सबै चाहिएको भए {}
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});





/* ------------------ Google OAuth ------------------ */
router.post('/google-login', googleLogin);

// Google OAuth2 Redirect Flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user;
    res.redirect(`http://localhost:3000/google-success?email=${user.email}&username=${user.username}`);
  }
);




// router.post('/google', async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Verify token with Google
//     const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
//     const { email, name, picture } = googleRes.data;

//     let user = await Auth.findOne({ email });
//     if (!user) {
//       user = await Auth.create({ email, name, image: picture });
//     }

//     const userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

//     res.json({ token: userToken, user });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(400).json({ message: 'Invalid Google token' });
//   }
// });



// Express backend


router.post("/google-login", async (req, res) => {
  const { email, username } = req.body;

  try {
    let user = await Auth.findOne({ email });

    if (!user) {
      // Register new user with 'user' role
      user = await Auth.create({ username: username, email, role: "user", password: "google" });
    }

    return res.status(200).json({ role: user.role });
  } catch (err) {
    return res.status(500).json({ message: "Google login failed" });
  }
});




// 🔹 Facebook Login
router.post("/facebook-login", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  try {
    let user = await Auth.findOne({ email });

    if (!user) {
      user = await Auth.create({
        username: name,
        email,
        password: "facebook_default_password",
        role: "user",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    console.error("Facebook login error:", error.message);
    res.status(500).json({ message: "Facebook login failed" });
  }
});





 

export default router;




