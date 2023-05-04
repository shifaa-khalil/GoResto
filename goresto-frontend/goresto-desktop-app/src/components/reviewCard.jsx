import React from "react";
import "../App.css";
import styles from "../css/reviewCard.module.css";
import star from "../images/Star.png";

const ReviewCard = (props) => {
  return (
    <div className={styles.reviewCard}>
      <div className={`flex-row ${styles.heading}`}>
        <span className={`semibold mediumsize ${styles.name}`}>
          {props.name}
        </span>
        <span className={`normalweight smallsize flex-row ${styles.rating}`}>
          {props.rating}
          <img src={star} />
        </span>
      </div>
      <div>
        <p className="normalweight smallsize">{props.content}</p>
      </div>
      <span className={`normalweight smallsize ${styles.date}`}>
        {props.date}
      </span>
    </div>
  );
};

export default ReviewCard;
