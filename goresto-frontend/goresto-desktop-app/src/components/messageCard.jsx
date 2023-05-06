import React from "react";
import "../App.css";
import styles from "../css/messageCard.module.css";

const messageCard = (props) => {
  return (
    <div className={`${styles.messageCard} ${props.className}`}>
      <span className={`normalweight xsmallsize ${styles.messageContent}`}>
        {props.content}
      </span>
      <span className={`normalweight tinysize ${styles.time}`}>
        {props.dateTime}
      </span>
    </div>
  );
};

export default messageCard;
