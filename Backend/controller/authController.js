import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
export const createUser = catchAsyncError(async (req, res) => {
   try{
    const { name, email, password,avatar} = req.body;
    const user = new User({
        name,
        email,
        password,
        avatar 
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
   }
    catch(error){
     res.status(500).json({ error: error.message });
    }
    
});