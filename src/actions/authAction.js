import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, SET_ERROR } from "./types";

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

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response.data.message,
    });
  }
};
