import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    images: [
        { type: String, required: true }
    ],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    category: [
        {
            type: String, required: true,
            enum: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home']
        }
    ],
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;