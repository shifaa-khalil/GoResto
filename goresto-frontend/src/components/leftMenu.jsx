import React from "react";
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

const LeftMenu = () => {
  return (
    <div className={`flex-column ${styles.container}`}>
      <div className="logo">
        <img src={logo} />
      </div>
      <div>
        <LeftMenuItem icon={dashboard} sectionName="Dashboard" />
        <LeftMenuItem icon={menu} sectionName="Menu" />
        <LeftMenuItem icon={reservations} sectionName="Reservations" />
        <LeftMenuItem icon={customers} sectionName="Customers" />
        <LeftMenuItem icon={offers} sectionName="Offers" />
        <LeftMenuItem icon={chats} sectionName="Chats" />
        <LeftMenuItem icon={earnings} sectionName="Earnings" />
        <LeftMenuItem icon={about} sectionName="About" />
      </div>
    </div>
  );
};

export default LeftMenu;
