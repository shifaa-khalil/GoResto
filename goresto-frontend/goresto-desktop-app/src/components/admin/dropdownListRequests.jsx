import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import styles from "../../css/dropDownList.module.css";
import axios from "axios";

const DropDownList = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
      <option>newest first</option>
        <option>oldest first</option>
      </select>
    </div>
  );
};

export default DropDownList;
