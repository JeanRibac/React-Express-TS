import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing.page";
import Navbar from "./components/Navbar/Navbar.component";
import SignIn from "./components/SignIn/SignIn.component";
import SignUp from "./components/SignUp/SignUp.component";
import User from "./pages/User/User.page";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.hoc";

// const history = createBrowserHistory();
function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      {/* @ts-ignore */}
      <PrivateRoute exact path="/user" component={User} />
    </BrowserRouter>
  );
}
export default Routes;
