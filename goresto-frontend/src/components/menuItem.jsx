import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/menuItem.module.css";

const MenuItem = (props) => {
  return (
    <div className={`flex-column ${styles.card} ${props.className}`}>
      <img className={styles.image} src={props.image} />
      <span className="bold">{props.name}</span>
      <span className="normalweight tinysize">{props.description}</span>
      <span className="bold">{props.price}</span>
    </div>
  );
};

export default MenuItem;
