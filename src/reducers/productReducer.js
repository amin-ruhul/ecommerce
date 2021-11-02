import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ALL_PRODUCT_REQUEST_FAIL,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  products: null,
  error: null,
  loading: false,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
