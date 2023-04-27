import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import Input from "../components/input";
import styles from "../css/setup.module.css";
import MyButton from "../components/button";

const Pending = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Pending" />
        <div className={`flex-column semibold ${styles.body}`}>
          <p>Not approved yet!</p>
          <p>Try to refresh the page...</p>
          <p>
            If you think there is a problem, please <a>contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pending;
