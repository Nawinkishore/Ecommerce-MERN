import express from 'express';
import { createUser } from '../controller/authController.js'; // Ensure the correct path and file extension
const router = express.Router();
router.post('/create', createUser);
export default router;