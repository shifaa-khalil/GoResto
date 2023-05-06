import React, { useState } from "react";
import "../../App.css";
import styles from "../../css/admin/inquiryCard.module.css";

const InquiryCard = (props) => {
  return (
    <div className={`flex-column ${styles.card}`}>
      <span className="normalweight">{props.restaurantName}</span>
      <span className="bold">{props.content}</span>
      <input />
    </div>
  );
};

export default InquiryCard;
