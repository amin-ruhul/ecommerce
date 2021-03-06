import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
  LOAD_ORDER_FAIL,
  LOAD_ORDER_REQUEST,
  LOAD_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  LOAD_ALL_ORDER_REQUEST,
  LOAD_ALL_ORDER_SUCCESS,
  LOAD_ALL_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_RESET,
} from "../actions/types";

const initialSate = {
  loading: false,
  order: null,
  orders: [],
  error: null,
};

//eslint-disable-next-line
export default (state = initialSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER_REQUEST:
    case LOAD_ORDER_REQUEST:
    case ORDER_DETAILS_REQUEST:
    case LOAD_ALL_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: payload,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case CREATE_ORDER_FAIL:
    case LOAD_ORDER_FAIL:
    case LOAD_ALL_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        order: null,
        orders: [],
        error: payload,
      };
    case LOAD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: payload,
      };
    case LOAD_ALL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload.orders,
        totalPrice: payload.totalPrice,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: payload,
      };

    default:
      return state;
  }
};
