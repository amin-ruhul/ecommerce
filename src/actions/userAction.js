import axios from "axios";
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_RESET,
} from "./types";

//************** update user profile */
export const updateProfile = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put("/api/user.update", userData, config);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

//************* reset update profile state */
export const resetUpdatedState = () => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_RESET,
  });
};

//************ clear the existing error */
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
