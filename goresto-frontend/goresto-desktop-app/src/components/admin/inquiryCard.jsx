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
          <>
            <span>Solved</span>
            <button
              className={`bold ${styles.disabled}`}
              onClick={props.onIgnore}
              disabled
            >
              ignore
            </button>
          </>
        ) : props.ignoredStatus ? (
          <>
            <button
              className={`bold ${styles.disabled}`}
              onClick={props.onSolve}
              disabled
            >
              mark as solved
            </button>
            <span>Ignored</span>
          </>
        ) : (
          <>
            <button
              className={`bold ${styles.enabled}`}
              onClick={props.onSolve}
            >
              mark as solved
            </button>
            <button
              className={`bold ${styles.enabled}`}
              onClick={props.onIgnore}
            >
              ignore
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryCard;
