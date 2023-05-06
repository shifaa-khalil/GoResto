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
  const [cancelled, setCancelled] = useState("");

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

  const handleCancel = (id) => {
    console.log(id);
    axios
      .delete(`http://127.0.0.1:8000/api/cancelReservationResto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCancelled(id);
        console.log(cancelled, "cancelled");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
                  <th>Cancel</th>
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
                      <td>
                        {cancelled === reservation.id ? (
                          <span>Cancelled</span>
                        ) : (
                          <button onClick={() => handleCancel(reservation.id)}>
                            cancel
                          </button>
                        )}
                      </td>
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
