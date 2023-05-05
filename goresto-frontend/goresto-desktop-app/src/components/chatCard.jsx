import React from "react";
import "../App.css";
import styles from "../css/chatCard.module.css";

const ChatCard = (props) => {
  return (
    <div className={`${styles.chatCard}`}>
      <span className={`semibold mediumsize ${styles.name}`}>{props.name}</span>
      <div className={styles.lastMessage}>
        <span className={`normalweight smallsize ${styles.content}`}>
          {props.content}
        </span>
        <span className="normalweight smallsize">{props.dateTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
