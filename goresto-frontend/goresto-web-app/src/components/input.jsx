import React from "react";
import "../App.css";
import styles from "../css/input.module.css";

const Input = (props) => {
  return (
    <div className={`flex-column ${styles.container} ${props.className}`}>
      <label className={`${styles.label} ${props.labelClassName}`}>
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`${styles.input} ${props.className}`}
      />
    </div>
  );
};

export default Input;
