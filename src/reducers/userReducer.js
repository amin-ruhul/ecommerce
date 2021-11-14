import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS } from "../actions/types";

const initialState = {
  loading: true,
  error: null,
  isUpdated: false,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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

    default:
      return state;
  }
};
