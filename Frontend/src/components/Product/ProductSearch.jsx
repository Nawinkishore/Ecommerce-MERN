import React, { useEffect, useState } from 'react';
import MetaData from "../MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsAction.js";
import Loader from "../layout/Loader.jsx";
import { toast } from "react-toastify";
import Products from "./Products.jsx";
import Pagination from '@mui/material/Pagination';
import { useParams } from "react-router-dom";

const ProductSearch = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const { loading, error, products, totalCounts = 0, resPerPage = 10 } = useSelector(state => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log(currentPage);
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getProducts(currentPage,keyword));  // Pass the current page to the action creator
    }, [dispatch, error, currentPage ,keyword]);

    return (
        <>
            <div className={'flex items-center justify-center w-full min-h-screen'}>
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
            <div className={'flex justify-center items-center m-5 w-full '}>
                <Pagination color={'primary'}
                            count={Math.ceil(totalCounts / resPerPage)}
                            page={currentPage}
                            onChange={setCurrentPageNo}
                />
            </div>
        </>
    );
};

export default ProductSearch;