import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  products: productReducer,
  auth: authReducer,
  user: userReducer,
});
