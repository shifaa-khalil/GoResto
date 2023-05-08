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
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getReservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReservations(response.data.reservations);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

  const handleCancel = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cancelReservationResto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCancelled(id);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredReservations = () => {
    switch (selectedFilter) {
      case "previous month":
        const previousMonth = new Date().getMonth() - 1;
        return reservations.filter(
          (r) => new Date(r.date).getMonth() === previousMonth
        );
      case "this month":
        return reservations.filter(
          (r) => new Date(r.date).getMonth() === new Date().getMonth()
        );
      case "this year":
        return reservations.filter(
          (r) => new Date(r.date).getFullYear() === new Date().getFullYear()
        );
      case "upcoming":
        return reservations.filter((r) => new Date(r.date) >= new Date());
      case "all":
      default:
        return reservations;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu reservationsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Reservations" className="block" />
        <DropDownList onChange={handleFilter} />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            {isLoading ? (
              <div className="container">
                <div className="spinner"></div>
              </div>
            ) : filteredReservations().length > 0 ? (
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
                    filteredReservations().map((reservation) => (
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
                            <button
                              onClick={() => handleCancel(reservation.id)}
                            >
                              cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>no data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
