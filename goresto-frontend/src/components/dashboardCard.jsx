import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/dashboardCard.module.css";

const DashboardCard = (props) => {
  return (
    <div className={`flex-column ${styles.card} ${props.className}`}>
      <span className="normalweight">{props.title}</span>
      <span className="bold">{props.value}</span>
      <img src={props.src} className={styles.icon} />
    </div>
  );
};

export default DashboardCard;
