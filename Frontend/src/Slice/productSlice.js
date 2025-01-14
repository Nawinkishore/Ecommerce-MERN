import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    product: [],  // Initialize products as an empty array
    error: null,   // Initialize error as null
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        productRequest: (state) => {
            return {
                loading: true
            };
        },
        productSuccess: (state, action) => {
            return {
                loading: false,
                product: action.payload
            };
        },
        productFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { productRequest, productSuccess, productFail } = productSlice.actions;
export default productSlice.reducer;
