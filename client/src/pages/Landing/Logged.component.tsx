import React from "react";
import { I_User } from "../../redux/Interfaces"

export const Logged = (onLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, user: I_User) => {
  return (
    <div className="col s12 center-align">
      <h4>
        <b>Hey there,</b> {user.email}
        <p className="flow-text grey-text text-darken-1">
          You are logged into a full-stack{" "}
          <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
      </p>
        <p className="flow-text grey-text text-darken-1">
          {/* Postings: {user.postings} */}
        </p>
      </h4>
      <button
        style={{
          width: "150px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem",
        }}
        onClick={onLogout}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      >
        Logout
      </button>
    </div>
  )
};