import mongoose  from "mongoose";
import validator from 'validator';
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
        required: [true, 'Please enter your password'],
        maxlength:[6, 'Your password must be at least 6 characters long'],
    },
    avatar:{
        type: String,
        required:true
    },
    role:{
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;