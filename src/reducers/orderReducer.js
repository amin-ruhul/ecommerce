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
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: payload,
      };
    case CREATE_ORDER_FAIL:
    case LOAD_ORDER_FAIL:
    case LOAD_ALL_ORDER_FAIL:
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
        order: null,
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
