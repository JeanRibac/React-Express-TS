import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setErrors } from "src/redux/auth/auth.actions";
import AuthService from "src/redux/auth/auth.services";

interface Auth {
  isAuthenticated: boolean;
  user: User;
  loading: boolean;
}

interface User {
  email: string;
  postings: [];
}
interface Props { }


const Landing: React.FC<Props> = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const auth: Auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({});

  const onLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    AuthService.logOut(dispatch);
  };

  useEffect(() => {
    const userInfo = AuthService.getUserDetails(dispatch);
    setUser(userInfo);
  }, []);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        {!auth.isAuthenticated
          ? NotLogged()
          : //@ts-ignore
          Logged(auth, onLogout, user)}
      </div>
    </div>
  );
};

const NotLogged = () => (
  <div className="col s12 center-align">
    <h4>
      <b>Full-stack app</b> with user authentication via JWT
    </h4>
    <br />
    <div className="col s6">
      <Link
        to="/register"
        style={{
          width: "140px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
        }}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Register
      </Link>
    </div>
    <div className="col s6">
      <Link
        to="/login"
        style={{
          width: "140px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
        }}
        className="btn btn-large btn-flat waves-effect white black-text"
      >
        Log In
      </Link>
    </div>
  </div>
);

const Logged = (auth: Auth, onLogoutClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, user: User) => (
  <div className="col s12 center-align">
    <h4>
      <b>Hey there,</b> {auth.user}
      <p className="flow-text grey-text text-darken-1">
        You are logged into a full-stack{" "}
        <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
      </p>
      <p className="flow-text grey-text text-darken-1">
        Postings: {user.postings}
      </p>
    </h4>
    <button
      style={{
        width: "150px",
        borderRadius: "3px",
        letterSpacing: "1.5px",
        marginTop: "1rem",
      }}
      onClick={onLogoutClick}
      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
    >
      Logout
    </button>
  </div>
);

export default Landing;
