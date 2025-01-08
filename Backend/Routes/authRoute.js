import express from 'express';
import { createUser,loginUser,logoutUser } from '../controller/authController.js'; // Ensure the correct path and file extension
const router = express.Router();
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser)
export default router;