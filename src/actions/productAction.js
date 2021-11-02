import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ALL_PRODUCT_REQUEST_FAIL,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./types";

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
