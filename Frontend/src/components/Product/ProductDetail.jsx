import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader.jsx";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";

const ProductDetail = () => {
    const { product, loading, error } = useSelector((state) => state.productState);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(0);

    useEffect(() => {
        if (error) {
            toast.error(error); // Display error toast
        } else {
            dispatch(getProduct(id));
        }
    }, [dispatch, id, error]);

    const handleClick = (e) => {
        if (e.target.name === 'add') {
            setQty(qty + 1);
        } else if (e.target.name === 'remove') {
            setQty(qty - 1);
        }
    };

    const productImage = product?.images?.[0] || '/images/default-product.jpg'; // Fallback to default if product.images is undefined or empty

    return (
        <div className={'p-3'}>
            {loading ? (
                <Loader />
            ) : product && (
                <div className={'flex items-center justify-center gap-5'}>
                    <img src={productImage} alt="Product" className={'w-64'} />
                    <div>
                        <h1 className={'text-2xl text-white'}>{product.name}</h1>
                        <h1 className={'text-xl'}>{product.description}</h1>
                        <p className={'text-yellow-500'}>{product.price} $</p>
                        <div className={'flex gap-2'}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={product.rating}
                                readOnly
                            />
                        </div>
                        <div className={'bg-gray-700 w-full h-1 mt-5'}></div>
                        <div>
                            <p className={'text-white text-2xl'}>Brand: {product.brand}</p>
                            <p className={'text-red-500'}>Remaining Stock: {product.countInStock}</p>
                        </div>
                        <div>
                            <label>Quantity: {qty}</label>
                            <div className={'space-x-2 mt-2'}>
                                <button
                                    className={'w-10 bg-green-400 text-white p-2'}
                                    name={'add'}
                                    onClick={handleClick}
                                >
                                    +
                                </button>
                                <button
                                    className={'w-10 bg-red-400 text-white p-2'}
                                    disabled={qty === 0}
                                    name={'remove'}
                                    onClick={handleClick}
                                >
                                    -
                                </button>
                                <button className={'bg-amber-400 p-2 text-white'}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
