import axios from "axios";
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_RESET,
  LOAD_ALL_USER_FAIL,
  LOAD_ALL_USER_REQUEST,
  LOAD_ALL_USER_SUCCESS,
  LOAD_SINGLE_USER_REQUEST,
  LOAD_SINGLE_USER_SUCCESS,
  LOAD_SINGLE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./types";

//*************load all user(ADMIN) *******************/
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

//****************  load single user    ************** */
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_SINGLE_USER_REQUEST });
    const { data } = await axios.get(`/api/admin/user/${id}`);
    dispatch({
      type: LOAD_SINGLE_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SINGLE_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//*******      Delete user (Admin)        ******* */
export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/admin/user/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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
