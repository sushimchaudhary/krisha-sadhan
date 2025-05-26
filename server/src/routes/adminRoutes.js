import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getAdminStats);
// In authRoutes.js or similar

router.get('/users', async (req, res) => {
  try {
    const users = await Auth.find(); // या सबै चाहिएको भए {}
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

export default router;
