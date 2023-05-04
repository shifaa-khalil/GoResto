import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <div className={"flex-column no-access giantsize"}>
      <p>You have no access to this page</p>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
};

export default NoAccess;
