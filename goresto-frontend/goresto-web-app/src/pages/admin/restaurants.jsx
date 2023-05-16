import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/admin/dropDownList";
import styles from "../../css/admin/admin.module.css";
import DropDownListMenu from "../../components/dropDownListMenu";

const Restaurants = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [restaurants, setRestaurants] = useState([]);
  const [deleted, setDeleted] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMenuFilter, setSelectedMenuFilter] = useState("enabled");
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredRestaurants = () => {
    switch (selectedFilter) {
      case "rejected":
        return restaurants.filter((r) => r.status === "rejected");
      case "pending":
        return restaurants.filter((r) => r.status === "pending");
      case "approved":
        return restaurants.filter((r) => r.status === "approved");
      case "all":
      default:
        return restaurants;
    }
  };

  const handleMenuFilter = (event) => {
    setSelectedMenuFilter(event.target.value);
  };

  const filteredMenu = () => {
    switch (selectedMenuFilter) {
      case "enabled":
        return menu.filter((m) => m.enabled === 1);
      case "disabled":
        return menu.filter((m) => m.enabled === 0);
      case "all":
      default:
        return menu;
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
          setIsLoading(false);
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

  const getMenu = (id) => {
    if (token) {
      setIsLoading(true);
      setMenuOpen(true);
      axios
        .get(`http://127.0.0.1:8000/api/getMenu/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMenu(response.data.menu);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu restaurantClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Restaurants" />
        {menuOpen ? (
          <div className={`flex-row ${styles.topRow}`}>
            <DropDownListMenu onChange={handleMenuFilter} />
            <button
              className={styles.closeButton}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              closeMenu
            </button>
          </div>
        ) : (
          <DropDownList onChange={handleFilter} />
        )}

        <div className={styles.body}>
          <div className={styles.tableContainer}>
            {isLoading ? (
              <div className="container">
                <div className="spinner"></div>
              </div>
            ) : menuOpen ? (
              filteredMenu().length > 0 ? (
                <table>
                  <thead>
                    <tr className="semibold tr">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Cuisine</th>
                      <th>Image</th>
                      <th>Added in</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenu().map((m) => (
                      <tr className="normalweight mediumsize" key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.name}</td>
                        <td>{m.description}</td>
                        <td>{m.price}</td>
                        <td>{m.category}</td>
                        <td>{m.cuisine}</td>
                        <td>{m.image}</td>
                        <td>{new Date(m.created_at).toLocaleDateString()}</td>
                        <td>{m.enabled ? "enabled" : "disabled"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>no data</p>
              )
            ) : filteredRestaurants().length > 0 ? (
              <table>
                <thead>
                  <tr className="semibold tr">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Manager</th>
                    <th>Logo</th>
                    <th>Location</th>
                    <th>Number of tables</th>
                    <th>Menu</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants &&
                    filteredRestaurants().map((restaurant) => (
                      <tr
                        className="normalweight mediumsize"
                        key={restaurant.id}
                      >
                        <td>{restaurant.id}</td>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.manager_id}</td>
                        <td>{restaurant.logo}</td>
                        <td>{restaurant.location}</td>
                        <td>{restaurant.number_of_tables}</td>
                        <td>
                          <button onClick={() => getMenu(restaurant.id)}>
                            open
                          </button>
                        </td>
                        <td>
                          {deleted == restaurant.id ? (
                            <span>Removed</span>
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
            ) : (
              <p>no data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
