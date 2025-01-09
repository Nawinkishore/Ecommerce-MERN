import Order from "../models/orderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Product from "../models/productModel.js";
// create new order => /orderApi/new
export const createOrder = catchAsyncError(async (req, res) => {
    try {
        const {
            orderItems,
            shippingInfo,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus // Ensure orderStatus is included
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus, // Include orderStatus
            paidAt: Date.now(),
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// get single order => /orderApi/getSingleOrder/:id
export const getSingleOrder = catchAsyncError(async (req, res) => {
   try {
       const order = await Order.findById(req.params.id).populate('user', 'name email');
       if (!order) {
           return res.status(404).json({
               success: false,
               message: 'Order not found',
           });
       }
       res.status(200).json({
           success: true,
           order,
       });
   }catch (error) {
       res.status(500).json({
           success: false,
           message: error.message,
       });
   }
});

// get logged in user orders => /orderApi/getMyOrders
export const getMyOrders = catchAsyncError(async (req, res) => {
   try {
       const orders = await Order.find({ user: req.user._id });
       res.status(200).json({
           success: true,
           orders,
       });
   }catch (error) {
       res.status(500).json({
           success: false,
           message: error.message,
       });
   }
});

// Admin get all orders => /orderApi/getAllOrders
export const getAllOrders = catchAsyncError(async (req, res) => {
   try {
       const orders = await Order.find();
       let totalAmount = 0;
       orders.forEach(order => {
           totalAmount += order.totalPrice;
       });
       res.status(200).json({
           success: true,
           totalAmount,
           orders,
       });
   }catch (error) {
       res.status(500).json({
           success: false,
           message: error.message,
       });
   }
});

//Admin update order => /orderApi/updateOrder/:id
export const updateOrder = catchAsyncError(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order.orderStatus === 'Delivered') {
            return res.status(400).json({
                success: false,
                message: 'You have already delivered this order',
            });
        }

        async function updateStock(id, quantity) {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            product.countInStock = product.countInStock - quantity;
            await product.save();
        }

        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }

        order.orderStatus = req.body.status;
        order.deliveredAt = Date.now();
        await order.save();

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// delete order => /orderApi/deleteOrder/:id
export const deleteOrder = catchAsyncError(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        await order.deleteOne(order);

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});