import mongoose  from "mongoose";
import validator from 'validator';
import crypto from 'crypto';
const userSchema = mongoose.Schema({
    name :{
        type: String,
        required: [true, 'Please enter your name'],
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password']

    },
    avatar:{
        type: String,
        required:true
    },
    role:{
        type: String,
        default: 'user',
        enum: {
            values: ['user', 'admin'],
            message: 'Please select correct role'
        }
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the token expiration time (e.g., 30 minutes)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);
export default User;