import React from "react";
import "../App.css";
import styles from "../css/leftMenuItem.module.css";

const LeftMenuItem = (props) => {
  return (
    <div className={`flex-row ${styles.container}`}>
      <img src={props.icon} className={styles.icon} />
      <div className={`flex-row ${props.className} ${styles.sectionName}`}>
        <p>{props.sectionName}</p>
      </div>
    </div>
  );
};

export default LeftMenuItem;
