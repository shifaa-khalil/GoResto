import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDownMenu.module.css";
import axios from "axios";

const DropDownMenu = (props) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignoutClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`http://127.0.0.1:8000/api/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          navigate("/signin");
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  return (
    <nav className={styles.dropDownMenu}>
      <div className={styles.value} onClick={handleUserClick}>
        <span className="flex-row">
          <span>{props.value}</span>
          <span>&#9660;</span>
        </span>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropDownItems}>
          <a>Settings</a>
          <a onClick={handleSignoutClick}>Sign out</a>
        </div>
      )}
    </nav>
  );
};

export default DropDownMenu;
