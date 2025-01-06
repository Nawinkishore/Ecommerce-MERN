
import Product from "../models/productModel.js";
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
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
export const createProduct = async (req, res) => {
    const { name, images, brand, category, description, price, countInStock, rating, numReviews } = req.body;

    // Log the request body for debugging
    // console.log('Request body:', req.body);

    const product = new Product({
        name,
        images,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
};

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