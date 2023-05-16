import React from "react";
import "../../App.css";
import styles from "../../css/dropDownList.module.css";

const DropDownListInquiries = (props) => {
  return (
    <div>
      <select className={styles.dropDownList} onChange={props.onChange}>
        <option>pending</option>
        <option>solved</option>
        <option>ignored</option>
        <option>all</option>
      </select>
    </div>
  );
};

export default DropDownListInquiries;
