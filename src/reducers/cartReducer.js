import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SAVE_SHIPING_INFO,
  SET_ERROR,
} from "../actions/types";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shipingInfo: localStorage.getItem("shipingInfo")
    ? JSON.parse(localStorage.getItem("shipingInfo"))
    : {},
  error: null,
};

//eslint-disable-next-line
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const item = payload;
      console.log(item);
      const isExisted = state.cartItems.find(
        (itm) => itm.product === item.product
      );
      if (isExisted) {
        return {
          ...state,
          cartItems: state.cartItems.map((itm) =>
            itm.product === isExisted.product ? item : itm
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== payload),
      };
    case SAVE_SHIPING_INFO:
      return {
        ...state,
        shipingInfo: payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
