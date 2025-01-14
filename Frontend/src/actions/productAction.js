import axios from "axios";
import { productRequest, productSuccess, productFail } from "../Slice/productSlice.js";
import { baseUrl } from "../../url/baseUrl.js";

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(productRequest());
        const { data } = await axios.get(`${baseUrl}/productApi/getProductById/${id}`);
        dispatch(productSuccess(data.product));
    } catch (error) {
        dispatch(productFail(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ));
    }
};
