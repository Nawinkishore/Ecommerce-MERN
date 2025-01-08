import express from 'express';
import {protectRoute,authorizeRoles} from "../middleware/protectRoute.js";
import {createProduct,getProducts,getProductById,editProduct,deleteProduct} from '../controller/productController.js';
const router = express.Router();
router.get('/getProducts',protectRoute,getProducts);
router.get('/getProductById/:id',getProductById);
router.post('/create',protectRoute,authorizeRoles('admin'),createProduct);
router.post('/edit/:id',protectRoute,authorizeRoles('admin'),editProduct);
router.delete('/delete/:id',protectRoute,authorizeRoles('admin'),deleteProduct);
export default router;