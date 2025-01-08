import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../middleware/generateToken.js";
export const createUser = catchAsyncError(async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            name,
            email,
            password: hashedPassword,
            avatar,

        };
        const createdUser = await User.create(user);

        if(createdUser){
            res.status(201).json({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                avatar: createdUser.avatar,
                password:hashedPassword,
                role: createdUser.role,
                token: generateToken(createdUser._id,res)
            });
            res.status(201).json(createdUser);
        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const loginUser = catchAsyncError(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            token: generateToken(user._id,res)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const logoutUser = catchAsyncError(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({ message: 'Logged out successfully' });
});