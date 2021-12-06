import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
} from "./types";

//********************login user *************** */

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = { email, password };
    await axios.post("/api/user/login", data, config);
    const res = await axios.get("/api/user");
    //console.log("login", res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response.data.message,
    });
  }
};

//************** Register user ******************** */
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.post("/api/user/register", userData, config);
    const res = await axios.get("/api/user");

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.error,
    });
  }
};

/************** load logged in user ******************** */
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//********************** LOGOUT USER **************/
export const logout = () => (dispatch) => {
  try {
    axios.get("/api/user/logout");
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response.data.error,
    });
  }
};

// ***************clear the existing error***************
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
