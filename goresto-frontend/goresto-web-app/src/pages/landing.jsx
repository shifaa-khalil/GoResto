import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import NavBar from "../components/navBar";
import gopro from "../images/GoPro.png";
import styles from "../css/landing.module.css";

const Landing = () => {
  const navigate = useNavigate();
  const handleJoinClick = () => {
    navigate("/register");
  };
  return (
    <div className={`flex-column ${styles.landingContainer}`}>
      <NavBar />
      <div className={`flex-row ${styles.bodyContainer}`}>
        <img src={polygon1} className="polygon1" />
        <div className={`flex-column ${styles.headingContainer}`}>
          <img src={gopro} />
          <MyButton
            className={styles.joinButton}
            label="Join our community"
            onClick={() => handleJoinClick()}
          />
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Landing;
