import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST_FAIL,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT,
  CLEAR_ERROR,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
} from "../actions/types";

const initialState = {
  products: null,
  error: null,
  loading: false,
  product: null,
  isReviewSuccess: false,
  adminProducts: null,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
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

    case ADMIN_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProducts: payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
      };

    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        isReviewSuccess: payload,
      };

    case NEW_REVIEW_RESET:
      return {
        ...state,
        isReviewSuccess: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
    case NEW_REVIEW_FAIL:
    case ADMIN_PRODUCT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
