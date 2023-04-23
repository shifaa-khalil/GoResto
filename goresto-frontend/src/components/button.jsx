import React from "react";
import "../App.css";

const MyButton = (props) => {
  return (
    <button className={`my-button ${props.className}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default MyButton;
