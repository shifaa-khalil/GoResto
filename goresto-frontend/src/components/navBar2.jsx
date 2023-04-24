import React from "react";
import "../App.css";
import logo from "../images/logo.png";
import DropDown from "./dropDown";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
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
    navigate("/signin");
  };
  return (
    <div className="flex-row nav-bar">
      <div className="logo">
        <img src={logo} />
      </div>

      <div className="flex-row nav-links">
        <p>{props.sectionName}</p>
        <DropDown />
      </div>
    </div>
  );
};

export default NavBar;
