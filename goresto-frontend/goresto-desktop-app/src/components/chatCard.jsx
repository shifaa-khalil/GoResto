import React from "react";
import "../App.css";
import styles from "../css/chatCard.module.css";

const ChatCard = (props) => {
  return (
    <div className={`${styles.chatCard} ${props.className}`}>
      <span className={`semibold smallsize ${styles.name}`}>{props.name}</span>
      <div className={styles.lastMessage}>
        <span className={`normalweight xsmallsize ${styles.content}`}>
          {props.content}
        </span>
        <span className="normalweight tinysize">{props.dateTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
