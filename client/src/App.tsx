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

const authService = new AuthService();
if (localStorage.token) {
  // Set auth token header auth
  const token = authService.loadAccessToken()
  //@ts-ignore
  authService.saveAccessToken(token);
  // // Decode token and get user info and exp
  //@ts-ignore
  const decoded: JWT = authService.decodeToken(token);
  // // Set user and isAuthenticated
  //@ts-ignore
  store.dispatch(authService.setUser(decoded.email));
  // // Check for expired token
  const currentTime = Date.now() / 1000; // in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    authService.logOut(store.dispatch); // Redirect to login
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
