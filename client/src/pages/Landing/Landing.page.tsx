import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "src/redux/auth/auth.services";
import { NotLogged } from "./NotLogged.component";
import { Logged } from "./Logged.component";
import { Props } from "src/redux/Interfaces";
import { Link } from "react-router-dom";


const Landing: React.FC<Props> = () => {
  //@ts-ignore
  const auth: Auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({});

  const onLogout = (e: SyntheticEvent) => {
    e.preventDefault();
    AuthService.logOut();
  };

  //@ts-ignore
  useEffect(() => {
    (async function () {
      if (auth.isAuthenticated) {
        const userInfo = await AuthService.getUserDetails();
        //@ts-ignore
        setUser(userInfo);
      }
    }())
  }, []);

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
        {!auth.isAuthenticated
          ? NotLogged()
          //@ts-ignore
          : Logged(onLogout, user)}
      </div>
    </div>
  );
};


export default Landing;
