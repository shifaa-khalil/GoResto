import React from "react";
import "../../App.css";
import styles from "../../css/dropDownList.module.css";

const DropDownListInquiries = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
        <option>all</option>
        <option>solved</option>
        <option>pending</option>
        <option>ignored</option>
      </select>
    </div>
  );
};

export default DropDownListInquiries;
