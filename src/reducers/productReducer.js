import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_REQUEST_SUCCESS,
  ADMIN_PRODUCT_REQUEST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST_SUCCESS,
  CREATE_PRODUCT_REQUEST_FAIL,
  SET_LOADING,
  SET_ERROR,
  SET_PRODUCT,
  CLEAR_ERROR,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "../actions/types";

const initialState = {
  products: null,
  error: null,
  loading: false,
  product: null,
  isReviewSuccess: false,
  adminProducts: null,
  isDeleted: false,
  isUpdated: false,
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
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        product: payload,
        success: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };

    case SET_ERROR:
    case NEW_REVIEW_FAIL:
    case ADMIN_PRODUCT_REQUEST_FAIL:
    case CREATE_PRODUCT_REQUEST_FAIL:
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PROFILE_FAIL:
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
