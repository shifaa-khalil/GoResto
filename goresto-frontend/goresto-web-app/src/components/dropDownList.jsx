import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../css/dropDownList.module.css";
import axios from "axios";

const DropDownList = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
        <option>upcoming</option>
        <option>this month</option>
        <option>this year</option>
        <option>previous month</option>
        <option>all</option>
      </select>
    </div>
  );
};

export default DropDownList;
