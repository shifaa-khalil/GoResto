import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import NavBar from "../components/navBar";
import Input from "../components/input";
import gopro from "../images/GoPro.png";
import styles from "../css/register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("");
  };
  return (
    <div className={`flex-column ${styles.registerContainer}`}>
      <NavBar />
      <div className={`flex-row ${styles.bodyContainer}`}>
        <img src={polygon1} className="polygon1" />
        <div className={`flex-column ${styles.form}`}>
          <div>
            <img src={gopro} className="go-pro" />
          </div>
          <Input type="text" label="Name" placeholder="Name" />
          <Input type="email" label="Email" placeholder="Email" />
          <Input type="password" label="Password" placeholder="Password" />
          <Input
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
          />
          <div className="flex-row buttons">
            <MyButton
              className={styles.formButton}
              label="Register"
              onClick={() => handleRegisterClick()}
            />
            <Link to="/signin" className={styles.formLink}>
              sign in instead
            </Link>
          </div>
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Register;
