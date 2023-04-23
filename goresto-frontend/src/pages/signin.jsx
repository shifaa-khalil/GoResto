import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import NavBar from "../components/navBar";
import Input from "../components/input";

const Signin = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("");
  };
  return (
    <div className="flex-column signin-container">
      <NavBar />
      <div className="flex-row body-container">
        <img src={polygon1} className="polygon1" />
        <div className="flex-column signin-form">
          <Input type="email" label="Email" placeholder="Email" />
          <Input type="password" label="Password" placeholder="Password" />
          <div className="flex-row buttons">
            <MyButton
              className="form-button"
              label="Sign in"
              onClick={() => handleRegisterClick()}
            />
            <Link to="../pages/register" className="form-link">
              register instead
            </Link>
          </div>
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Signin;
