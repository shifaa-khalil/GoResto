import React from "react";
import "../App.css";
import styles from "../css/dropDownList.module.css";

const DropDownList = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
        <option>enabled</option>
        <option>disabled</option>
        <option>all</option>
      </select>
    </div>
  );
};

export default DropDownList;
