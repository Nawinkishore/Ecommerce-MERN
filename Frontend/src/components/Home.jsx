import React, { useEffect } from 'react';
import MetaData from "./MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsAction.js";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Loader from "./layout/Loader.jsx";
import { toast } from "react-toastify";

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productsState);

    useEffect(() => {
        console.log('Error:', error);
        console.log('Products:', products);
        if (error) {
            return toast.error(error);
        }
        dispatch(getProducts());  // Call the action creator properly
    }, [dispatch,error]);

    return (
        <>
            {loading ? <Loader /> : (
                <div className="flex items-center justify-center w-full">
                    <MetaData title={'Products'} />
                    {products && products.map(product => (
                        <div key={product._id} className="w-64 h-max p-2 flex flex-col items-center justify-center ">
                            <div className='border rounded-md border-gray-600 w-full'>
                                <img src={product.images[0]} alt={product.name} className="w-full h-60 object-contain" />

                                <div className="p-2">
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
                            <button className="btn btn-outline btn-primary w-full m-2">Buy</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Home;
