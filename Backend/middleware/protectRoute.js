import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsyncError from "./catchAsyncError.js";

export const protectRoute = catchAsyncError(async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Please login to access this resource' });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to access this resource` });
        }
        next();
    }
}