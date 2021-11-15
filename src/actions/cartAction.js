import axios from "axios";
import { ADD_TO_CART } from "./types";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/product/${id}`);
    console.log(id, quantity);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.data._id,
        name: data.data.name,
        price: data.data.price,
        image: data.data.images[0].url,
        stock: data.data.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error(error);
  }
};
