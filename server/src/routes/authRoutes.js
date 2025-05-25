import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, getAdminById, getUserById } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/get-admin/:id', getAdminById); // ✅ New route
router.get('/get-user/:id', getUserById);

export default router;
