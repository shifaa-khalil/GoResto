import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/dropDownList";
import styles from "../../css/admin/admin.module.css";

const Restaurants = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  //   const [approved, setApproved] = useState("");
  //   const [rejected, setRejected] = useState("");

  useEffect(() => {
    // if (token) {
    axios
      .get(`http://127.0.0.1:8000/api/getRestaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.error(error);
      });
    // } else navigate("/signin");
  }, []);

  //   const handleApprove = (id) => {
  //     axios
  //       .put(`http://127.0.0.1:8000/api/approveRequest/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("approved");
  //         setApproved(id);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   const handleReject = (id) => {
  //     axios
  //       .delete(`http://127.0.0.1:8000/api/rejectRequest/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setRejected(id);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu restaurantClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Requests" className="block" />
        <DropDownList />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr className="semibold tr">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Manager</th>
                  <th>Logo</th>
                  <th>Location</th>
                  <th>tables</th>
                  <th>Menu</th>
                  {/* <th>approval</th> */}
                </tr>
              </thead>
              <tbody>
                {restaurants &&
                  restaurants.map((restaurant) => (
                    <tr className="normalweight mediumsize" key={restaurant.id}>
                      <td>{restaurant.id}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.manager_id}</td>
                      <td>{restaurant.logo}</td>
                      <td>{restaurant.location}</td>
                      <td>{restaurant.number_of_tables}</td>
                      <td>{restaurant.menu.menuItem}</td>
                      {/* <td>
                        {approved == restoRequest.id ? (
                          <span>Approved</span>
                        ) : rejected == restoRequest.id ? (
                          <span>Rejected</span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApprove(restoRequest.id)}
                            >
                              approve
                            </button>
                            <button
                              onClick={() => handleReject(restoRequest.id)}
                            >
                              reject
                            </button>
                          </>
                        )}
                      </td> */}
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

export default Restaurants;
