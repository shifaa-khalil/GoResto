import React from "react";
import "../App.css";
import styles from "../css/chatCard.module.css";
import Chat from "../images/startChat.png";

const ChatCard = (props) => {
  return (
    <div
      className={`${styles.chatCard} ${props.className}`}
      onClick={props.onClick}
    >
      <span className={`semibold smallsize ${styles.name}`}>{props.name}</span>
      <div className={styles.lastMessage}>
        <span className={`normalweight xsmallsize ${styles.content}`}>
          {props.content}
        </span>
        {props.dateTime ? (
          <span className="normalweight tinysize">{props.dateTime}</span>
        ) : (
          <img src={Chat} className={styles.chatIcon} />
        )}
      </div>
    </div>
  );
};

export default ChatCard;
