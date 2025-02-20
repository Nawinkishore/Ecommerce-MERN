import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    images: [
        { type: String, required: true }
    ],
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: [
        {
            type: String, required: true,
            enum: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home','Smartphones']
        }
    ],
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [
        {
            User: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
            rating: {type: Number, required: true},
            comment: {type: String, required: true}
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

const Product = mongoose.model('Products', productSchema);
export default Product;