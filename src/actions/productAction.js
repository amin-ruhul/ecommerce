import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ALL_PRODUCT_REQUEST_FAIL,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./types";
import axios from "axios";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    const res = await axios.get("/api/products");

    dispatch({
      type: ALL_PRODUCT_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
