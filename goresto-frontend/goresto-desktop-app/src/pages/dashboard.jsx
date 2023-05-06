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
  const navigate = useNavigate();
  const [totalReservations, setTotalReservations] = useState("");
  const [totalReviews, setTotalReviews] = useState("");
  const [rating, setRating] = useState("");

  if (token) {
    axios
      .get(`http://127.0.0.1:8000/api/getRestaurant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTotalReservations(response.data.totalReservations);
        setTotalReviews(response.data.totalReviews);
        setRating(response.data.restaurant.rating);
      })
      .catch((error) => {
        console.error(error);
      });
  } else navigate("/signin");

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
            value={totalReservations}
            src={reservations}
            onClick={() => navigate("/reservations")}
          />
          <DashboardCard
            className={styles.grey}
            title="Total earnings"
            value="$12.4k"
            src={earnings}
            // onClick={() => navigate("/earnings")}
          />
          <DashboardCard
            className={styles.grey}
            title="Total customers"
            value="62"
            src={customers}
            // onClick={() => navigate("/customers")}
          />
          <DashboardCard
            className={styles.grey}
            title="Total reviews"
            value={totalReviews}
            src={chats}
            onClick={() => navigate("/reviews")}
          />
          <DashboardCard
            className={styles.red}
            title="Rating"
            value={rating}
            src={star}
            onClick={() => navigate("/reviews")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
