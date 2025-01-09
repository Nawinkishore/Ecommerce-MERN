    import catchAsyncError from "../middleware/catchAsyncError.js";
    import validator from 'validator';
    import User from "../models/userModel.js";
    import bcrypt from "bcrypt";
    import generateToken from "../middleware/generateToken.js";
    import sendMail from "../utils/email.js";
    import crypto from "crypto";
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


    export const forgotPassword = catchAsyncError(async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).json({ message: 'User not found with this email' });
            }

            // Generate reset token
            const resetToken = user.getResetPasswordToken();

            // Save the updated user with the reset token and expiration time
            await user.save({ validateBeforeSave: false });

            // Create reset URL
            const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

            const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;

            try {
               await sendMail(
                    {
                        email: user.email,
                        subject: 'Password reset token',
                        message
                    }
               )
                res.status(200).json({
                    success: true,
                    message: `Email sent to ${user.email} successfully`,
                });
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save({ validateBeforeSave: false });

                return res.status(500).json({ message: 'Email could not be sent' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    export const resetPassword = catchAsyncError(async (req, res) => {
        try {
            // Get hashed token
            const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            // Convert password and confirmPassword to strings
            const password = req.body.password.toString();
            const confirmPassword = req.body.confirmPassword.toString();

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            res.status(200).json({
                success: true,
                message: 'Password updated successfully'
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
// Get User Profile
export  const getUserProfile = catchAsyncError(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    }catch {
        res.status(500).json({ message: error.message });
    }
});

export const changePassword = catchAsyncError(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('+password');
        const currentPassword = req.body.currentPassword.toString();
        const newPassword = req.body.newPassword.toString();
        const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});
//Update Profile

    export const updateProfile = catchAsyncError(async (req, res) => {
        try {
            const { name, email } = req.body;
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update email only if it's different and doesn't already exist
            if (email && email !== user.email) {
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: 'Invalid email address' });
                }

                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                user.email = email;
            }

            // Update name if provided
            if (name) {
                user.name = name;
            }

            // Save the updated user
            await user.save();

            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar, // Optionally include any other user details
                }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    //Admin Routes

    // Get all users
    export const getUsers = catchAsyncError(async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Get user by ID (Admin)
    export const getUserById = catchAsyncError(async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id.trim()); // Trim the ID
            if (!user) {
                return next(new Error('User not found'));
            }
            res.status(200).json({ message: 'User found', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Admin : Update user
    export const updateUser = catchAsyncError(async (req, res) => {
        try {
            const { name, email, role } = req.body;
            const user = await User.findById(req.params.id.trim()); // Trim the ID

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update email only if it's different and doesn't already exist
            if (email && email !== user.email) {
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: 'Invalid email address' });
                }

                const emailExists = await User.findOne({ email });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                user.email = email;
            }

            // Update name if provided
            if (name) {
                user.name = name;
            }

            // Update role if provided
            if (role) {
                user.role = role;
            }

            // Save the updated user
            await user.save();

            res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Admin : Delete user
    export const deleteUser = catchAsyncError(async (req, res) => {
        try {
            const user = await User.findById(req.params.id.trim()); // Trim the ID
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.deleteOne(user)
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
