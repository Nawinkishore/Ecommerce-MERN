import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dataBase.js';
import productRoute from './Routes/productRoute.js';
import authRoute from './Routes/authRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV}`);
});
connectDB();

app.use('/productApi', productRoute);
app.use('/authApi', authRoute);

