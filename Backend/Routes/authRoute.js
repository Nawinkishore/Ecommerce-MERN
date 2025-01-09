import express from 'express';
import { createUser,
    loginUser,
    logoutUser,
    forgotPassword ,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile} from '../controller/authController.js'; // Ensure the correct path and file extension
import  {protectRoute} from '../middleware/protectRoute.js';
const router = express.Router();
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);
router.get('/me',protectRoute,getUserProfile);
router.put('/updateProfile',protectRoute,updateProfile);
router.post('/changePassword',protectRoute,changePassword);
export default router;