import { ADD_TO_CART } from "../actions/types";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
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

    default:
      return state;
  }
};
