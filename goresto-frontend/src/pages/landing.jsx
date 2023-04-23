import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import landingHeading from "../images/landingHeading.png";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";

const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("");
  };
  return (
    <div className="flex-row">
      <img src={polygon1} className="polygon1" />
      <div className="flex-column">
        <img src={landingHeading} className="landingHeading" />
        <MyButton label={"Join our community"} onClick={handleClick} />
      </div>
      <img src={polygon2} className="polygon2" />
    </div>
  );
};

export default Landing;
