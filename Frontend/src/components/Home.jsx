import React from 'react';
import MetaData from "./MetaData.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getProducts} from "../actions/productAction.js";
const Home = () => {
    const dispatch = useDispatch();
    // Redux Thunk allows us to write action creators that return a function instead of an action object.
    //  This function takes dispatch (and optionally getState) as arguments.
    useEffect(() => {
        dispatch(getProducts);
    },[]);
    return (

        <div className="grid grid-cols-3 gap-3">
            <MetaData title={'Products'} />
            <div className="card card-side bg-base-100 flex flex-col items-center justify-center ">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
            <div className="card card-side bg-base-100 flex flex-col items-center justify-center ">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
            <div className="card card-side bg-base-100 flex flex-col items-center justify-center ">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;