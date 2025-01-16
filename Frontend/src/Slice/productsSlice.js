import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading : false,
};
const productsSlice = createSlice({
    name: "products",
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
                products: action.payload.products,
                totalCounts: action.payload.totalCounts,
                resPerPage : action.payload.resPerPage
            }
        },
        productsFail: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
export const {productsRequest,productsSuccess,productsFail} = productsSlice.actions;
export default productsSlice.reducer;