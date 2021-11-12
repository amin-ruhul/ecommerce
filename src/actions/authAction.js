import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
} from "./types";

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
    const res = await axios.post(
      "https://ecommerceapi101.herokuapp.com/api/user/login",
      data,
      config
    );
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

// clear the existing error
export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
