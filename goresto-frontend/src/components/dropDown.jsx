import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDown.module.css";

const DropDown = (props) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.dropDownMenu}>
      <div className={styles.userName} onClick={handleUserClick}>
        {/* {props.name} */}

        <span className="flex-row">
          <span>Name</span>
          <span>&#9660;</span>
        </span>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropDownItems}>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      )}
    </nav>
  );
};

export default DropDown;
