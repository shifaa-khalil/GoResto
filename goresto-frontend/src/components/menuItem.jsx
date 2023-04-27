import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/menuItem.module.css";

const MenuItem = (props) => {
  return (
    <div className={`flex-column ${styles.card}`}>
      <img className={styles.image} src={props.image} />
      <span className={`bold ${styles.name}`}>{props.name}</span>
      <span className={`normalweight tinysize ${styles.desc}`}>
        {props.description}
      </span>
      <span className="bold">{props.price}</span>
    </div>
  );
};

export default MenuItem;
