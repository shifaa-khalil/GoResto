import React, { useState } from "react";
import "../App.css";
import styles from "../css/dropDownMenu.module.css";

const DropDownMenu = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return <span>Welcome, {props.value}</span>;
};

export default DropDownMenu;
