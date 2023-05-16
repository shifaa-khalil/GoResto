import React from "react";
import "../App.css";
import styles from "../css/navBar.module.css";

const NavBar2 = (props) => {
  const name = localStorage.getItem("name");

  return (
    <div className={`flex-row ${styles.navBar2}`}>
      <h1>{props.sectionName}</h1>
      <div>
        <p>Welcome, {name}</p>
      </div>
    </div>
  );
};

export default NavBar2;
