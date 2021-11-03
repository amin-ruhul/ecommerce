import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT,
} from "../actions/types";

const initialState = {
  products: null,
  error: null,
  loading: false,
  product: null,
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
    case ALL_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case SET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
