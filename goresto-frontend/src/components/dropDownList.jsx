import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDownList.module.css";
import axios from "axios";

const DropDownList = (props) => {
  return (
    <div>
      <select className={styles.dropDownList}>
        <option>this month</option>
        <option>this year</option>
        <option>previous month</option>
        <option>all</option>
      </select>
      <span className={styles.arrow}>&#9660;</span>
    </div>
  );
};

export default DropDownList;
