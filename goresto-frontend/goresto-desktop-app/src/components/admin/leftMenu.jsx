import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import styles from "../../css/admin/leftMenu.module.css";
import LeftMenuItem from "../leftMenuItem";
import requests from "../../images/request.png";
import users from "../../images/user.png";
import restaurants from "../../images/restaurant.png";
import inquiries from "../../images/inquiries.png";
import signout from "../../images/signout.png";
import logo from "../../images/logo.png";

const LeftMenu = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = localStorage.getItem("token");

  const handleSignoutClick = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("menuItems");
      // localStorage.removeItem("restaurant");
      navigate("/signin");
    }
  };

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
          onClick={() => navigate("/requests")}
        />
        <LeftMenuItem
          icon={restaurants}
          sectionName="Restaurants"
          className={props.restaurantClassName}
          onClick={() => navigate("/restaurants")}
        />
        <LeftMenuItem
          icon={users}
          sectionName="Users"
          className={props.usersClassName}
          onClick={() => navigate("/users")}
        />
        <LeftMenuItem
          icon={inquiries}
          sectionName="Inquiries"
          className={props.inquiriesClassName}
          onClick={() => navigate("/inquiries")}
        />
        <LeftMenuItem
          icon={signout}
          sectionName="Signout"
          onClick={handleSignoutClick}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
