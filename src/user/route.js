import express from 'express';
import { registerController, loginController, logoutController, refreshTokenController, getProfile, updateProfile } from './controller.js';
import authenticateUser from '../../middleware/authentication.js';

const router = express.Router();

// Register
router.post('/register', registerController);

// Login
router.post('/login', loginController);

// Logout
router.post('/logout', authenticateUser, logoutController);

router.get('/profile', authenticateUser, getProfile);

// Update profile (requires authentication)
router.put('/profile', authenticateUser, updateProfile);

// Refresh access token
router.post('/refresh-token', refreshTokenController);

export default router;
