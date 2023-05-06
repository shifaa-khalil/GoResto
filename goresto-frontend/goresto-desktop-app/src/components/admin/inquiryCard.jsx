import React from "react";
import "../../App.css";
import styles from "../../css/admin/inquiryCard.module.css";

const InquiryCard = (props) => {
  return (
    <div className={`flex-column ${styles.card}`}>
      <div className={styles.row}>
        <span className="bold">{props.restaurantName}</span>
        <span className="normalweight">{props.date}</span>
      </div>
      <span className={`normalweight ${styles.content}`}>{props.content}</span>
      <div className={`flex-row ${styles.buttons}`}>
        {props.solvedStatus ? (
          <p>Solved</p>
        ) : (
          <button className="bold" onClick={props.onSolve}>
            mark as solved
          </button>
        )}
        {props.ignoredStatus ? (
          <p>Ignored</p>
        ) : (
          <button className="bold" onClick={props.onIgnore}>
            ignore
          </button>
        )}
      </div>
    </div>
  );
};

export default InquiryCard;
