import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducers";
import errorReducer from "./auth/errors.reducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});