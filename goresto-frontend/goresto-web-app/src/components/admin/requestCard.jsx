import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../css/admin/requestCard.module.css";

const RequestCard = (props) => {
  return (
    <div
      className={`flex-column ${styles.card} ${props.className}`}
      onClick={props.onClick}
    >
      <span className="normalweight">{props.requestId}</span>
      <span className="bold">{props.restaurantName}</span>
      <img src={props.src} className={styles.icon} />
    </div>
  );
};

export default RequestCard;
