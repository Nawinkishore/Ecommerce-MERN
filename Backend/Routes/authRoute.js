import express from 'express';
import { createUser,
    loginUser,
    logoutUser,
    forgotPassword ,
    resetPassword,
    getUserProfile,
    changePassword,
    updateProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser} from '../controller/authController.js'; // Ensure the correct path and file extension
import  {protectRoute,authorizeRoles} from '../middleware/protectRoute.js';
const router = express.Router();
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:resetToken', resetPassword);
router.get('/me',protectRoute,getUserProfile);
router.put('/updateProfile',protectRoute,updateProfile);
router.post('/changePassword',protectRoute,changePassword);

//Admin Routes
router.get('/admin/users',protectRoute,authorizeRoles('admin'),getUsers);
router.route('/admin/user/:id')
    .get(protectRoute,authorizeRoles('admin'),getUserById)
    .put(protectRoute,authorizeRoles('admin'),updateUser)
    .delete(protectRoute,authorizeRoles('admin'),deleteUser);
export default router;