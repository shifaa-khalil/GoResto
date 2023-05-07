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
import signout from "../images/signout.png";
import logo from "../images/logo.png";
import Inquiry from "../images/inquiries.png";

const LeftMenu = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = localStorage.getItem("token");

  const handleSignoutClick = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("menuItems");
      localStorage.removeItem("restaurant");
      navigate("/signin");
    }
  };

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
          disabled={props.disabled}
          onClick={() => navigate("/dashboard")}
        />
        <LeftMenuItem
          icon={menu}
          sectionName="Menu"
          className={props.menuClassName}
          disabled={props.disabled}
          onClick={() => navigate("/menu")}
        />
        <LeftMenuItem
          icon={reservations}
          sectionName="Reservations"
          className={props.reservationsClassName}
          disabled={props.disabled}
          onClick={() => navigate("/reservations")}
        />
        {/* <LeftMenuItem
          icon={offers}
          sectionName="Offers"
          className={props.offersClassName}
          onClick={() => navigate("/")}
        /> */}
        <LeftMenuItem
          icon={chats}
          sectionName="Reviews"
          className={props.reviewsClassName}
          disabled={props.disabled}
          onClick={() => navigate("/reviews")}
        />
        <LeftMenuItem
          icon={chats}
          sectionName="Chats"
          className={props.chatsClassName}
          disabled={props.disabled}
          onClick={() => navigate("/chats")}
        />
        {/* <LeftMenuItem
          icon={earnings}
          sectionName="Earnings"
          className={props.earningsClassName}
          onClick={() => navigate("/")}
        /> */}{" "}
        {/* ++orders */}
        <LeftMenuItem
          icon={about}
          sectionName="About"
          className={props.aboutClassName}
          disabled={props.disabled}
          onClick={() => navigate("/about")}
        />
        <LeftMenuItem
          icon={Inquiry}
          sectionName="Inquiries"
          className={props.inquiryClassName}
          disabled={props.disabled}
          onClick={() => navigate("/inquiry")}
        />
        <LeftMenuItem
          icon={signout}
          sectionName="Sign out"
          onClick={handleSignoutClick}
        />
      </div>
    </div>
  );
};

export default LeftMenu;
