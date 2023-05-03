import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import styles from "../css/leftMenu.module.css";
import LeftMenuItem from "../components/leftMenuItem";
import dashboard from "../images/dashboard.png";
import menu from "../images/menu.png";
import reservations from "../images/reservations.png";
import customers from "../images/customers.png";
import offers from "../images/offers.jpeg";
import chats from "../images/chats.png";
import earnings from "../images/earnings.png";
import about from "../images/about.png";
import logo from "../images/logo.png";

const LeftMenu = (props) => {
  const navigate = useNavigate();

  return (
    <div className={`flex-column ${styles.container} ${props.className}`}>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className={props.parent}>
        <div className={props.overlay}></div>
        <LeftMenuItem
          icon={dashboard}
          sectionName="Dashboard"
          className={props.dashboardClassName}
          onClick={() => navigate("/dashboard")}
        />
        <LeftMenuItem
          icon={menu}
          sectionName="Menu"
          className={props.menuClassName}
          onClick={() => navigate("/menu")}
        />
        <LeftMenuItem
          icon={reservations}
          sectionName="Reservations"
          className={props.reservationsClassName}
          onClick={() => navigate("/reservations")}
        />
        <LeftMenuItem
          icon={customers}
          sectionName="Customers"
          className={props.customersClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={offers}
          sectionName="Offers"
          className={props.offersClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={chats}
          sectionName="Chats"
          className={props.chatsClassName}
          onClick={() => navigate("/chatsReviews")}
        />
        <LeftMenuItem
          icon={earnings}
          sectionName="Earnings"
          className={props.earningsClassName}
          onClick={() => navigate("/")}
        />
        <LeftMenuItem
          icon={about}
          sectionName="About"
          className={props.aboutClassName}
          onClick={() => navigate("/about")}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
