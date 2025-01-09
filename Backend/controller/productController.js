
import Product from "../models/productModel.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
export const getProducts = async (req, res) => {
    const resPerPage = 2; // results per page
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    try {
        const products = await apiFeatures.query;
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createProduct = catchAsyncError(async (req, res) => {
    try {
        const {
            name,
            images,
            brand,
            description,
            category,
            price,
            countInStock,
            rating,
            numReviews
        } = req.body;

        const product = await Product.create({
            name,
            images,
            brand,
            description,
            category,
            price,
            countInStock,
            rating,
            numReviews,
            user: req.user._id, // Ensure user is included
        });

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

export const editProduct = async (req, res) => {
    const { name, images, brand, category, description, price, countInStock, rating, numReviews } = req.body;
    const productId = req.params.id;

    try {
        const product = await Product.findById({ _id: productId });

        if (product) {
            product.name = name;
            product.images = images;
            product.brand = brand;
            product.category = category;
            product.description = description;
            product.price = price;
            product.countInStock = countInStock;
            product.rating = rating;
            product.numReviews = numReviews;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById({ _id: productId });
        if (product) {
            await Product.deleteOne({_id: productId});
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};