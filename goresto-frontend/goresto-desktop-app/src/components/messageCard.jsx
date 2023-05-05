import React from "react";
import "../App.css";
import styles from "../css/messageCard.module.css";

const messageCard = (props) => {
  return (
    <div className={`${styles.messageCard}`}>
      <span className={`normalweight mediumsize ${styles.messageContent}`}>
        messagemessagemessagem essagemessagemessagemessagemessagemessagemessage
        messagemessagemessagemessagemessagemessagemessage
      </span>
      <span className={`normalweight tinysize ${styles.time}`}>dateTime</span>
    </div>
  );
};

export default messageCard;
