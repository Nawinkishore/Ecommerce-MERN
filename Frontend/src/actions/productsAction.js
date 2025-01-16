import axios from "axios";
import { productsRequest, productsSuccess, productsFail } from "../Slice/productsSlice.js";
import { baseUrl } from "../../url/baseUrl.js";

export const getProducts = (page = 1,keyword)=> async (dispatch) => {
    try {
        dispatch(productsRequest());
        let link = `${baseUrl}/productApi/getProducts?page=${page}`;
        if(keyword)
        {
            link+= `&keyword=${keyword}`;
        }
        const { data } = await axios.get(link);

        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        ));
    }
};
