import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/admin/dropDownList";
import styles from "../../css/admin/admin.module.css";

const Restaurants = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [restaurants, setRestaurants] = useState([]);
  const [deleted, setDeleted] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("upcoming");
  const navigate = useNavigate();

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredRestaurants = () => {
    switch (selectedFilter) {
      case "approved":
        return restaurants.filter((r) => r.approved === 1);
      case "all":
      default:
        return restaurants;
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getRestaurantsdata`, {
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
    } else navigate("/signin");
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/deleteRestaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDeleted(id);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu restaurantClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Restaurants" className="block" />
        <DropDownList onChange={handleFilter} />
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
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants &&
                  filteredRestaurants().map((restaurant) => (
                    <tr className="normalweight mediumsize" key={restaurant.id}>
                      <td>{restaurant.id}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.manager_id}</td>
                      <td>{restaurant.logo}</td>
                      <td>{restaurant.location}</td>
                      <td>{restaurant.number_of_tables}</td>
                      <td>{restaurant.menu.menuItem}</td>
                      <td>
                        {deleted == restaurant.id ? (
                          <span>Deleted</span>
                        ) : (
                          <button onClick={() => handleDelete(restaurant.id)}>
                            remove
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

export default Restaurants;
