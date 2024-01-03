import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
        },
    },
});

export const getCarThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())
        .then((resp) => {
            dispatch(setCart(resp.data));
        })
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (product, quantity) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .post(
            "https://e-commerce-api-v2.academlo.tech/api/v1/cart",
            { productId: product.id, quantity },
            getConfig()
        )
        .then((resp) => dispatch(getCarThunk()))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};
export const updateCartThunk = (quantity, product, id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .put(
            "https://e-commerce-api-v2.academlo.tech/api/v1/cart/" + id,
            { quantity, productId: product.productId },
            getConfig()
        )
        .then((resp) => dispatch(getCarThunk()))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setIsLoading(false)));
};

export const removeCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .delete(
            "https://e-commerce-api-v2.academlo.tech/api/v1/cart/" + id,
            getConfig()
        )
        .then((res) => dispatch(getCarThunk()))
        .catch((err) => console.error(err.response))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
