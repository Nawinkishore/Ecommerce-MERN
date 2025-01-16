import React from 'react';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const Products = ({ product }) => {
    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/product/${id}`); // Use the navigate function
    };

    return (
        <div className="w-64 h-96">
            <Link to={`/product/${product._id}`}>
                <div className="border rounded-md border-gray-600 w-full h-full flex flex-col">
                    <img src={product.images[0]} alt={product.name}
                         className="w-full h-48 object-contain"/>
                    <div className="p-2 flex-grow">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.description.substring(0, 100)}...</p>
                        <p>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={product.rating}
                                readOnly
                            />
                        </p>
                        <p>Reviews: {product.numReviews}</p>
                        <p className="text-sm">Price: {product.price}</p>
                    </div>
                </div>
            </Link>
            <button className="bg-blue-500 w-full text-white mt-2"
                    onClick={() => handleNavigate(product._id)}
            >Buy</button>
        </div>
    );
};

export default Products;