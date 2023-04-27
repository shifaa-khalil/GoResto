import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/dashboard.module.css";
import DashboardCard from "../components/dashboardCard";
import reservations from "../images/reservations-black.png";
import customers from "../images/customers-black.png";
import chats from "../images/reviews-black.png";
import earnings from "../images/earnings-black.png";
import star from "../images/Star.png";
import DropDownList from "../components/dropDownList";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu dashboardClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Dashboard" className="block" />
        <DropDownList />
        <div className={`semibold ${styles.body}`}>
          <DashboardCard
            className={styles.grey}
            title="Total reservations"
            value="62"
            src={reservations}
          />
          <DashboardCard
            className={styles.grey}
            title="Total earnings"
            value="$12k"
            src={earnings}
          />
          <DashboardCard
            className={styles.grey}
            title="Total customers"
            value="62"
            src={customers}
          />
          <DashboardCard
            className={styles.grey}
            title="Total reviews"
            value="62"
            src={chats}
          />
          <DashboardCard
            className={styles.red}
            title="Rating"
            value="4.2"
            src={star}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
