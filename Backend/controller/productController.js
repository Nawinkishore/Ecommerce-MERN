
import Product from "../models/productModel.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

export const getProducts = catchAsyncError(async (req, res) => {
    const resPerPage = 2; // results per page
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
    try {
        const products = await apiFeatures.query;
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getProductById = catchAsyncError(async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
});
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

export const editProduct = catchAsyncError(async (req, res) => {
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
});

export const deleteProduct = catchAsyncError(async (req, res) => {
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

});

// create product review

export const createProductReview = catchAsyncError(async (req, res) => {
    const { rating, comment, productId } = req.body;
    try {
        const product = await Product.findById(productId);
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
           product.reviews.forEach((review) => {
               if (review.user.toString() === req.user._id.toString()) {
                   review.comment = comment;
                   review.rating = rating;
               }
           });
        }

        const review = {
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        // Calculate the rating of the product
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        product.rating = isNaN(product.rating) ? 0 : product.rating;
        await product.save({ validateBeforeSave: false });

        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get  product reviews
// GET /reviews?id=productId
export const getProductReviews = catchAsyncError(async (req, res) => {
    const productId = req.query.id;
    try {
        const product = await Product.findById(productId);
        res.json(product.reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete product review
// DELETE /reviews?id=productId
export const deleteReview = catchAsyncError(async (req, res) => {
    const productId = req.query.id;
    const reviewId = req.query.reviewId;
    try {
        const product = await Product.findById(productId);
        const reviews = product.reviews.filter(
            (review) => review._id.toString() !== reviewId
        );
        const numReviews = reviews.length;
        let rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;
       rating =  isNaN(rating) ? 0 : rating;
        await Product.findByIdAndUpdate(productId, {
            reviews,
            numReviews,
            rating,
        });
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
