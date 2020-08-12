import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { I_State } from "src/redux/Interfaces";
import AuthService from "../../redux/auth/auth.services"

function Navbar() {

  const isAuthenticated = useSelector((state: I_State) => state.auth.isAuthenticated)

  const onLogoutClick = (e: SyntheticEvent) => {
    e.preventDefault();
    AuthService.logOut();
  };

  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <Link
            to="/"
            style={{ fontFamily: "monospace" }}
            className="col s5 brand-logo center black-text"
          >
            <i className="material-icons">code</i>
            MERN
          </Link>
          {isAuthenticated && <button
            style={{
              width: "12vmin",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
