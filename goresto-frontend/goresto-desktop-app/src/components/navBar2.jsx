import React from "react";
import "../App.css";
import DropDownMenu from "./dropDownMenu";
import styles from "../css/navBar.module.css";
import SearchBar from "../components/searchBar";

const NavBar2 = (props) => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  return (
    <div className={`flex-row ${styles.navBar2}`}>
      <h1>{props.sectionName}</h1>
      <SearchBar className={props.className} />
      <div className={styles.dropDownContainer}>
        <DropDownMenu value={name} />
      </div>
    </div>
  );
};

export default NavBar2;
