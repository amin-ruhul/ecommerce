import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT,
} from "../actions/types";

const initialState = {
  loading: false,
  // isAuthenticated: false,
  user: null,
  error: null,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: payload,
      };
    case SET_ERROR:
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
        error: null,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};
