import React from 'react';
import MetaData from "./MetaData.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../actions/productAction.js";

// import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
const Home = () => {
    const dispatch = useDispatch();
    // Redux Thunk allows us to write action creators that return a function instead of an action object.
    //  This function takes dispatch (and optionally getState) as arguments.
    useEffect(() => {
        dispatch(getProducts);
    },[]);
    const {products} = useSelector(state => state.product)
    // console.log(products);
    return (
        <div className="grid grid-cols-3 gap-3">
            <MetaData title={'Products'} />
            {products && products.map(product => (
                <div key={product._id} className="w-64 h-max p-2 flex flex-col items-center justify-center ">
                    <div className='border rounded-md border-gray-600 w-full'>
                        <img src={product.images[0]} alt={product.name} className="w-full h-60 object-contain"/>

                        <div className="p-2">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p>{product.description.substring(0, 100)}...</p>
                            <p>
                                <Typography component="legend">Controlled</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={product.rating}

                                    readOnly={true}
                                />
                            </p>
                            <p></p>
                            <p>Reviews : {product.numReviews}</p>
                            <p className="text-sm">Price-{product.price}</p>

                        </div>

                    </div>
                    <button className="btn btn-outline btn-primary w-full m-2">Buy</button>
                </div>
            ))}

        </div>
    );
};

export default Home;