import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
  LOAD_ORDER_REQUEST,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  LOAD_ALL_ORDER_REQUEST,
  LOAD_ALL_ORDER_SUCCESS,
  LOAD_ALL_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "./types";
import axios from "axios";

//************* create new order and save in DB */
export const createNewOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//********* load orders from database */
export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ORDER_REQUEST });

    const { data } = await axios.get("/api/order/myorder");

    dispatch({
      type: LOAD_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//******************** get single order details */

export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.error,
    });
  }
};

//************   GET ALL ORDERS (ADMIN)***************** */
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ALL_ORDER_REQUEST });

    const { data } = await axios.get("/api/admin/orders");
    console.log("orders", data);
    dispatch({
      type: LOAD_ALL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_ALL_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//*************  DELETE ORDER **************** */
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//***********  UPDATE ORDER status(ADMIN)********* */
export const updateOrder = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/order/${id}`,
      updatedData,
      config
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//*********** clear existing error */
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
