import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface ComponentType {
  component: React.ComponentType<any | string>;
}

const PrivateRoute = ({ component: Component, ...rest }: ComponentType) => {
  //@ts-ignore
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
};

export default PrivateRoute;
