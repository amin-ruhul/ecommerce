import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  products: productReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});
