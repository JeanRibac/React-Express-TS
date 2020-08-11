import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "src/redux/auth/auth.actions";
import { useDispatch } from "react-redux";
function Navbar() {
  const dispatch = useDispatch();
  const onLogoutClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutUser());
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
          <button
            style={{
              width: "12vmin",
            }}
            onClick={onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
