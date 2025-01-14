import axios from "axios";
import { productsRequest, productsSuccess, productsFail } from "../Slice/productsSlice.js";
import { baseUrl } from "../../url/baseUrl.js";

export const getProducts = ()=> async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get(`${baseUrl}/productApi/getProducts`);
        dispatch(productsSuccess(data.products));
    } catch (error) {
        dispatch(productsFail(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ));
    }
};
