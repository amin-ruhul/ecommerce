import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  CLEAR_ERROR,
  UPDATE_PROFILE_RESET,
  LOAD_ALL_USER_FAIL,
  LOAD_ALL_USER_SUCCESS,
  LOAD_ALL_USER_REQUEST,
  LOAD_SINGLE_USER_REQUEST,
  LOAD_SINGLE_USER_SUCCESS,
  LOAD_SINGLE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../actions/types";

const initialState = {
  loading: true,
  error: null,
  isUpdated: false,
  isDeleted: false,
  users: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ALL_USER_REQUEST:
    case LOAD_SINGLE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOAD_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case LOAD_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case LOAD_ALL_USER_FAIL:
    case LOAD_SINGLE_USER_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        users: [],
        error: payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isUpdated: payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        isUpdated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};
