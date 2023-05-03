import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import styles from "../../css/admin/leftMenu.module.css";
import LeftMenuItem from "../leftMenuItem";
import requests from "../../images/request.png";
import customers from "../../images/customers.png";
import restaurants from "../../images/restaurant.png";
import chats from "../../images/chats.png";
import logo from "../../images/logo.png";

const LeftMenu = (props) => {
  const navigate = useNavigate();

  return (
    <div className={`flex-column ${styles.container} ${props.className}`}>
      <div className={`logo ${styles.logo}`}>
        <img src={logo} />
      </div>
      <div className={props.parent}>
        <LeftMenuItem
          icon={requests}
          sectionName="Requests"
          className={props.requestsClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={restaurants}
          sectionName="Restaurants"
          className={props.restaurantClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={customers}
          sectionName="Customers"
          className={props.customersClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={chats}
          sectionName="Chats"
          className={props.chatsClassName}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
