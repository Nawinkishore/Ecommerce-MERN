import express from 'express';
import {createProduct,getProducts,getProductById,editProduct,deleteProduct} from '../controller/productController.js';
const router = express.Router();
router.get('/getProducts',getProducts);
router.get('/getProductById/:id',getProductById);
router.post('/create',createProduct);
router.post('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
export default router;