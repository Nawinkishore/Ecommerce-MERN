import jwt from "jsonwebtoken";
const generateToken = (id,res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        httpOnly: true,
        secure: false
    });
    return token;
};

export default generateToken;