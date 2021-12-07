import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST_FAIL,
  SET_PRODUCT,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_SUCCESS,
  CREATE_PRODUCT_REQUEST_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
  UPDATE_PRODUCT_REQUEST_FAIL,
} from "./types";
import axios from "axios";

// get all product from database
export const getProducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      const res = await axios.get(
        `/api/products?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_PRODUCT_REQUEST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data.error,
      });
    }
  };

// GET SINGLE PRODUCT FROM DATABASE
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: SET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response.data.error,
    });
  }
};

// *********  handel product review  ***************
export const productReview = (userData) => async (dispatch) => {
  try {
    console.log("hello from product review");
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/review/product", userData, config);
    console.log("res", data);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.error,
    });
  }
};

// get all product from database without filter and pagination
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_REQUEST_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.error,
    });
  }
};

// ********  CREATE NEW PRODUCT ***************

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/product", productData, config);

    dispatch({
      type: CREATE_PRODUCT_REQUEST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.error,
    });
  }
};

// ************ DELETE PRODUCT ****************
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.error,
    });
  }
};

// **********     UPDATE PRODUCT     **************

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/product/${id}`, productData, config);

    dispatch({
      type: UPDATE_PRODUCT_REQUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST_FAIL,
      payload: error.response.data.error,
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
