import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
} from "../actions/types";

const initialState = {
  loading: false,
  isAuthenticated: false,
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
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: payload,
      };
    case SET_ERROR:
      return {
        ...state,
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
