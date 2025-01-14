import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import ProductsReducer from "./Slice/productsSlice.js";
import ProductReducer from "./Slice/productSlice.js";
const reducer = combineReducers({
    productsState: ProductsReducer,
    productState: ProductReducer
})

const store = configureStore({
    reducer,
    applyMiddleware: [thunk]
});

export default store;