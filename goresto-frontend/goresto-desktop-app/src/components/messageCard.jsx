import React from "react";
import "../App.css";
import styles from "../css/messageCard.module.css";

const messageCard = (props) => {
  return (
    <div className={`${styles.messageCard}`}>
      <span className="semibold mediumsize">message</span>
      <span className="normalweight smallsize">dateTime</span>
    </div>
  );
};

export default messageCard;
