import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import ProductReducer from "./Slice/productSlice";
const reducer = combineReducers({
    product: ProductReducer
})

const store = configureStore({
    reducer,
    applyMiddleware: [thunk]
});

export default store;