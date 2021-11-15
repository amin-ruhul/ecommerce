import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM } from "./types";

//******************* item add to cart */
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/product/${id}`);
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

//******************* remove cart item *************/
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    //const { data } = await axios.get(`/api/product/${id}`);
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};
