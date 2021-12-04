import axios from "axios";
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_RESET,
  LOAD_ALL_USER_FAIL,
  LOAD_ALL_USER_REQUEST,
  LOAD_ALL_USER_SUCCESS,
} from "./types";

//*************LOAD ALL USER(ADMIN) */
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ALL_USER_REQUEST });
    const { data } = await axios.get("/api/admin/users");
    dispatch({
      type: LOAD_ALL_USER_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ALL_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

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
