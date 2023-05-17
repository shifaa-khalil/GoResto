import React from "react";
import "../App.css";
import styles from "../css/input.module.css";

const Input = (props) => {
  return (
    <div className={`flex-column ${styles.container} ${props.className}`}>
      <label className={`${styles.label} ${props.labelClassName}`}>
        {props.label}
      </label>
      {props.onClick ? (
        <div className={`${styles.input} ${props.className} flex-row`}>
          <input
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            className={styles.miniInput}
            readOnly={props.readOnly}
          />
          <button className={styles.button} onClick={props.onClick}>
            choose
          </button>
        </div>
      ) : (
        <input
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className={`${styles.input} ${props.className} ${props.inputClassName}`}
          maxLength={props.maxLength}
        />
      )}
    </div>
  );
};

export default Input;
