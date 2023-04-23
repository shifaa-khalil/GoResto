import React from "react";
import "../App.css";

const MyButton = (props) => {
  return (
    <button className="myButton" onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default MyButton;
