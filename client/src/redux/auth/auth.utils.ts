import axios from "axios";

export const setAuthToken = (token: any) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["authorization"];
  }
};