import React from "react";
import "../App.css";
import logo from "../images/logo.png";
import DropDown from "./dropDown";
import styles from "../css/navBar.module.css";

const NavBar2 = (props) => {
  return (
    <div className={`flex-row ${styles.navBar2}`}>
      <div className="logo">
        <img src={logo} />
      </div>
      <h1>{props.sectionName}</h1>
      <div className={styles.dropDownContainer}>
        <DropDown />
      </div>
    </div>
  );
};

export default NavBar2;
