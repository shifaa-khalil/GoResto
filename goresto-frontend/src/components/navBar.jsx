import React, { useState, useEffect } from "react";
import "../App.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "../css/navBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) setAuthenticated(true);
  }, []);

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
    <div className={`flex-row ${styles.navBar}`}>
      <div className="logo">
        <img src={logo} />
      </div>

      <div className={`flex-row ${styles.navLinks}`}>
        <p onClick={() => handleStepsClick()}>How it works</p>
        <p onClick={() => handleAboutClick()}>About</p>
        <p onClick={() => handleContactClick()}>Contact</p>
        <p onClick={() => handleSigninClick()}>
          {authenticated ? name : "Sign in"}
        </p>
      </div>
    </div>
  );
};

export default NavBar;
