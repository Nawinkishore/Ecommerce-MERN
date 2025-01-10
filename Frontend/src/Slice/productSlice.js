import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading : false,
};
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productsRequest: (state) => {
           return {
                loading: true
           }
        },
        productsSuccess: (state,action) => {
            return {
                loading: false,
                products: action.payload
            }
        },
        productsFail: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
export const {productsRequest,productsSuccess,productsFail} = productSlice.actions;
export default productSlice.reducer;