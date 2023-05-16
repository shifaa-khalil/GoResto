import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={"flex-column no-access giantsize"}>
      <p>There is no such page</p>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
};

export default NotFound;
