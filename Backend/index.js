import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dataBase.js';
import productRoute from './Routes/productRoute.js';
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
connectDB();

app.use('/productApi', productRoute);

