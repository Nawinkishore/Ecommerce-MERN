import express from 'express';
import {protectRoute,authorizeRoles} from "../middleware/protectRoute.js";
import {createProduct,getProducts,getProductById,editProduct,deleteProduct,createProductReview,getProductReviews,deleteReview} from '../controller/productController.js';
const router = express.Router();
router.get('/getProducts',protectRoute,getProducts);
router.get('/getProductById/:id',getProductById);
router.put('/createProductReview',protectRoute,createProductReview);
router.get('/getProductReviews/',getProductReviews);
router.delete('/deleteReview/',protectRoute,deleteReview);

//Admin Routes
router.post('/admin/create',protectRoute,authorizeRoles('admin'),createProduct);
router.post('/admin/edit/:id',protectRoute,authorizeRoles('admin'),editProduct);
router.delete('/admin/delete/:id',protectRoute,authorizeRoles('admin'),deleteProduct);
export default router;