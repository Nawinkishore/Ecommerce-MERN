import connectDB from "./config/dataBase.js";
import  dotenv from "dotenv";
import Product from "./models/productModel.js";
import products from "./data/products.js";
connectDB();
dotenv.config();
const importData = async () => {
    try {
        await Product.deleteMany();  // Delete existing products
        await Product.insertMany(products);  // Insert new products
        console.log("Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.error("Error with data import:", error.message);
        process.exit(1);
    }
};
importData();