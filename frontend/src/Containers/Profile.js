import React from "react";

import "../Styles/Profile.css";

import Log from "../Components/Log/Log";
import logImg from "../Assets/img/log.jpg";
import logo from "../Assets/img/logo.png";

export default function Profile() {
  return (
    <div className="profile">
      <img className="profile-logo" src={logo} alt="" />
      <div className="d-md-flex justify-content-center container-fluid profil-page   ">
        <div className="justify-content-md-center row    ">
          <div className="sign-card col-md-6 mx-md-2">
            <Log />
          </div>

          <div className="col-md-4 mx-md-2">
            <img src={logImg} alt="inscription" />
          </div>
        </div>
      </div>
    </div>
  );
}
