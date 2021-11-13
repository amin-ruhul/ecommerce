import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
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
    const res = await axios.post("/api/user/login", data, config);
    console.log("data", res.data);
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    console.log("Error", error.response.data.error);

    dispatch({
      type: SET_ERROR,
      payload: error.response.data.error,
    });
  }
};

//************** Register user ******************** */
export const register = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/api/user/register", userData, config);

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

// ***************clear the existing error***************
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};