import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDown.module.css";
import axios from "axios";

const DropDown = (props) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
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
          navigate("/signin");
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  return (
    <nav className={styles.dropDownMenu}>
      <div className={styles.userName} onClick={handleUserClick}>
        <span className="flex-row">
          <span>{props.name}</span>
          <span>&#9660;</span>
        </span>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropDownItems}>
          <a href="#">Settings</a>
          <a onClick={(e) => handleLogoutClick(e)}>Logout</a>
        </div>
      )}
    </nav>
  );
};

export default DropDown;
