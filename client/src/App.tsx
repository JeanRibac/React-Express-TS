import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./Routes";
import "./App.scss";
import AuthService from "./redux/auth/auth.services";

interface JWT {
  email: string;
  exp: number;
  iat: number;
}


if (localStorage.token) {
  // Set auth token header auth
  const token = AuthService.loadAccessToken()
  //@ts-ignore
  AuthService.saveAccessToken(token);
  // // Decode token and get user info and exp
  //@ts-ignore
  const decoded: JWT = AuthService.decodeToken(token);
  // // Set user and isAuthenticated
  //@ts-ignore
  AuthService.setUser(decoded.email);
  // // Check for expired token
  const currentTime = Date.now() / 1000; // in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    AuthService.logOut(); // Redirect to login
  }
}
function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Routes />
      </Fragment>
    </Provider>
  );
}

export default App;
