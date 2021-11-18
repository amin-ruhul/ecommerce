import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
  LOAD_ORDER_FAIL,
  LOAD_ORDER_REQUEST,
  LOAD_ORDER_SUCCESS,
} from "../actions/types";

const initialSate = {
  loading: false,
  order: {},
  orders: [],
  error: null,
};

//eslint-disable-next-line
export default (state = initialSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER_REQUEST:
    case LOAD_ORDER_REQUEST:
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
      return {
        ...state,
        loading: false,
        order: {},
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
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
