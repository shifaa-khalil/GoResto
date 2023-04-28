import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/reservations.module.css";
import DropDownList from "../components/dropDownList";

const Reservations = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [reservations, setReservations] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getReservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setReservations(response.data.reservations))
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

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
              <thead>
                <tr className="semibold">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {reservations &&
                  reservations.map((reservation) => (
                    <tr
                      className="normalweight mediumsize"
                      key={reservation.id}
                    >
                      <td>{reservation.id}</td>
                      <td>{reservation.name}</td>
                      <td>{reservation.date}</td>
                      <td>{reservation.time}</td>
                      <td>{reservation.count}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
