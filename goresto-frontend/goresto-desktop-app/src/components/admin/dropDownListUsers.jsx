import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../../css/dropDownList.module.css";
import axios from "axios";

const DropDownList = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
        <option>all</option>
        <option>managers</option>
        <option>customers</option>
      </select>
    </div>
  );
};

export default DropDownList;
