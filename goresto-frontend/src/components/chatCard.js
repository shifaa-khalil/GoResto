import React from "react";
import "../App.css";
import styles from "../css/chatCard.module.css";

const ChatCard = (props) => {
  return (
    <div className={`${styles.chatCard}`}>
      <span className="semibold mediumsize">{props.name}</span>
      <span className="normalweight smallsize">{props.lastMessage}</span>
    </div>
  );
};

export default ChatCard;
