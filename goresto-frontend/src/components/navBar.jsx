import React from "react";
import "../App.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleStepsClick = () => {
    navigate("");
  };
  const handleAboutClick = () => {
    navigate("");
  };
  const handleContactClick = () => {
    navigate("");
  };
  const handleSigninClick = () => {
    navigate("");
  };
  return (
    <div className="flex-row nav-bar">
      <div className="logo">
        <img src={logo} />
      </div>

      <div className="flex-row nav-links">
        <p onClick={() => handleStepsClick()}>How it works</p>
        <p onClick={() => handleAboutClick()}>About</p>
        <p onClick={() => handleContactClick()}>Contact</p>
        <p onClick={() => handleSigninClick()}>Sign in</p>
      </div>
    </div>
  );
};

export default NavBar;
