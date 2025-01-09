import express from "express";
import { protectRoute, authorizeRoles } from "../middleware/protectRoute.js";
import {createOrder
    ,getSingleOrder
    ,getMyOrders
    ,getAllOrders
    ,updateOrder
    ,deleteOrder} from "../controller/orderController.js";
const router = express.Router();
router.post('/new', protectRoute, createOrder);
router.get('/getSingleOrder/:id', protectRoute, getSingleOrder);
router.get('/getMyOrders', protectRoute, getMyOrders);

//Admin Routes

router.get('/getAllOrders', protectRoute, authorizeRoles('admin'), getAllOrders);
router.put('/updateOrder/:id', protectRoute, authorizeRoles('admin'), updateOrder);
router.delete('/deleteOrder/:id', protectRoute, authorizeRoles('admin'), deleteOrder);

export default router;