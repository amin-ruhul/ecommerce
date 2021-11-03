import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  SET_PRODUCT,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./types";
import axios from "axios";

// get all product from database
export const getProducts = () => async (dispatch) => {
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

// GET SINGLE PRODUCT FROM DATABASE
export const getProduct = (id) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: SET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    });
  }
};

// set loading true
export const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};

// clear existing error
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
