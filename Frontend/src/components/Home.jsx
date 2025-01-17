import React, { useEffect, useState } from 'react';
import MetaData from "./MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsAction.js";
import Loader from "./layout/Loader.jsx";
import { toast } from "react-toastify";
import Products from "./Product/Products.jsx";
import Pagination from '@mui/material/Pagination';

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";


const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products, totalCounts = 0, resPerPage = 10 } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const setCurrentPageNo = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [price, setPrice] = useState([100, 10000]);

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };
    console.log(currentPage);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getProducts(currentPage,null,price));  // Pass the current page to the action creator
    }, [dispatch, error, currentPage,price]);

    return (
        <div className={'space-y-12'}>
            <div className="flex items-center justify-between p-5">

                <div>
                    <h1 className="font-bold text-xl text-white">Filter</h1>
                    <Box sx={{width: 200}}>
                        <Slider
                            value={price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            min={100}
                            max={10000}
                            aria-labelledby="range-slider"
                        />
                    </Box>
                    <div>
                        <h1>Categories</h1>
                    </div>
                </div>

            </div>
            <div className={'flex items-center justify-center w-full'}>
                {loading ? <Loader/> : (

                    <div className={'grid grid-cols-3 gap-3'}>
                        <MetaData title={'Products'}/>
                        {products && products.map(product => (
                            <div key={product._id}>
                                <Products product={product}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={'flex justify-center items-center w-full '}>
                <Pagination color={'primary'}
                            count={Math.ceil(totalCounts / resPerPage)}
                            page={currentPage}
                            onChange={setCurrentPageNo}
                />
            </div>
        </div>
    );
};

export default Home;