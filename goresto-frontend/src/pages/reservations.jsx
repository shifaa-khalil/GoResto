import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/reservations.module.css";
import DashboardCard from "../components/dashboardCard";
import reservations from "../images/reservations-black.png";
import customers from "../images/customers-black.png";
import chats from "../images/reviews-black.png";
import earnings from "../images/earnings-black.png";
import star from "../images/Star.png";
import DropDownList from "../components/dropDownList";

const Reservations = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu reservationsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Reservations" className="block" />
        <DropDownList />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            <table>
              <tr className="semibold">
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Count</th>
              </tr>
              <tr className="normalweight mediumsize">
                <td>1</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>2</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>3</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>4</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>5</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>6</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>7</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
              <tr className="normalweight mediumsize">
                <td>8</td>
                <td>Shifaa Khalil</td>
                <td>4/27/2023</td>
                <td>17:30</td>
                <td>3</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
