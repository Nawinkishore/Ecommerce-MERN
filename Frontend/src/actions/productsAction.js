import axios from "axios";
import { productsRequest, productsSuccess, productsFail } from "../Slice/productsSlice.js";
import { baseUrl } from "../../url/baseUrl.js";

export const getProducts = (page = 1)=> async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get(`${baseUrl}/productApi/getProducts?page=${page}`);
        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ));
    }
};
