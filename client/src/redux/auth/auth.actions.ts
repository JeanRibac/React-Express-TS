import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { setAuthToken } from "./auth.utils";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./auth.types";

interface LoginData {
  email: string,
  password: string
}
interface RegisterData extends LoginData {
  confirmedPassword: string
}

interface Decoded {
  email: string
}

export const setErrors = (err: any) => {
  return {
    type: GET_ERRORS,
    payload: err.response.data
  };
};

// Register User
export const registerUser = (userData: RegisterData, history: any) => (dispatch: Dispatch<AnyAction>) => {
  axios
    .post("/api/auth/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err => dispatch(setErrors(err)))
};
// Login - get user token
export const loginUser = (userData: LoginData) => (dispatch: Dispatch<AnyAction>) => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded: Decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded.email));
    })
    .catch(err => dispatch(setErrors(err)));
};
// Set logged in user
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => (dispatch: Dispatch<AnyAction>) => {
  // Remove token from local storage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};