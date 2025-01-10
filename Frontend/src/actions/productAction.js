import axios from "axios";
import { productsRequest, productsSuccess, productsFail } from "../Slice/productSlice.js";
import { baseUrl } from "../../url/baseUrl.js";

export const getProducts = async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get(`${baseUrl}/productApi/getProducts`);

        // Assuming data contains a 'products' key.
        dispatch(productsSuccess(data.products));  // Accessing the products array

    } catch (error) {
        dispatch(productsFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        ));
    }
};
