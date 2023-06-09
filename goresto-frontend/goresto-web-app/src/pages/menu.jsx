import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import DropDownList from "../components/dropDownListMenu";
import Input from "../components/input";
import MyButton from "../components/button";
import styles from "../css/menu.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [menuItems, setMenuItems] = useState(localStorage.getItem("menuItems"));
  const [formOpen, setFormOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("enabled");
  const [cuisines, setCuisines] = useState([]);

  const validateForm = () => {
    let isValid = true;
    if (!name || !image || !description || !price || !category) {
      setError("All fields are required");
      isValid = false;
    }
    return isValid;
  };

  const handleInputChange = (event) => {
    setError(event.target.value);
    if (validateForm) {
      setError("");
      setSuccess("");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredMenu = () => {
    switch (selectedFilter) {
      case "enabled":
        return menu.filter((m) => m.enabled === 1);
      case "disabled":
        return menu.filter((m) => m.enabled === 0);
      case "all":
      default:
        return menu;
    }
  };

  const handleDone = (event) => {
    event.preventDefault();
    setFormOpen(false);
    // if (token) {
    //   if (menuItems < 10) setError("Add at least 10 items");
    //   else navigate("/pending");
    // } else navigate("/signin");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = new FormData();
        data.append(
          "name",
          name.replace(/\b\w/g, (char) => char.toUpperCase())
        );
        data.append("image", image);
        data.append("description", description);
        data.append("price", price);
        data.append(
          "category",
          category.replace(/\b\w/g, (char) => char.toUpperCase())
        );
        data.append("cuisine", cuisine);

        axios
          .post(`http://127.0.0.1:8000/api/addMenuItem`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            setName("");
            setImage(null);
            setDescription("");
            setPrice("");
            setCategory("");
            setCuisine("American");
            setSuccess("Item added successfully!");
            setError("");
            // setMenuItems(menuItems + 1);
          })
          .catch((error) => {
            console.error(error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.status === "failure" &&
              error.response.data.message === "item already exists"
            )
              setError("item name already exists");
          });
      }
    } else navigate("/signin");
  };

  const handleEnable = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/enableMenuItem/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDisable = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/disableMenuItem/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getMenu`, {
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
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getCuisinesResto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCuisines(response.data.cuisines);
        console.log(response.data.cuisines);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu
          menuClassName={styles.open}
          // menuClassName={menuItems > 10 ? styles.open : undefined}
          // overlay={menuItems <= 10 ? styles.overlay : undefined}
          // parent={menuItems <= 10 ? styles.parent : undefined}
          // disabled={menuItems <= 10 ? styles.disabled : undefined}
        />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Menu" />
        <div className={`flex-column ${formOpen ? styles.hidden : undefined}`}>
          <div className={`flex-row ${styles.topRow}`}>
            <DropDownList onChange={handleFilter} />
            <button onClick={() => setFormOpen(true)}>add item</button>
          </div>
          <div className={[styles.body]}>
            <div className={styles.tableContainer}>
              {isLoading ? (
                <div className="container">
                  <div className="spinner"></div>
                </div>
              ) : filteredMenu().length > 0 ? (
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu &&
                      filteredMenu().map((m) => (
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
                          <td>
                            {m.enabled ? (
                              <button
                                onClick={() => {
                                  handleDisable(m.id);
                                }}
                              >
                                disable
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  handleEnable(m.id);
                                }}
                              >
                                Enable
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
        <div
          className={`flex-column ${formOpen ? styles.form : styles.hidden}`}
        >
          {success && <p className={styles.success}>{success}</p>}
          {error && <p className={styles.error}>{error}</p>}
          <Input
            label="Name"
            labelClassName="semibold"
            type="text"
            value={name}
            placeholder="type here"
            className={`${styles.input} ${styles.capital}`}
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Image"
            labelClassName="semibold"
            type="file"
            placeholder="file name"
            className={styles.input}
            onChange={(e) => {
              setImage(e.target.files[0]);
              handleFileChange(e);
            }}
          />
          <Input
            label="Description"
            labelClassName="semibold"
            type="text"
            value={description}
            placeholder="type here"
            className={styles.input}
            onChange={(e) => {
              setDescription(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Price"
            labelClassName="semibold"
            type="text"
            value={price}
            placeholder="type here"
            className={styles.input}
            onChange={(e) => {
              setPrice(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Category"
            labelClassName="semibold"
            type="text"
            value={category}
            placeholder="type here"
            className={styles.input}
            onChange={(e) => {
              setCategory(e.target.value);
              handleInputChange(e);
            }}
          />
          {/* <Input
            label="Cuisine"
            labelClassName="semibold"
            type="text"
            value={cuisine}
            placeholder="type here"
            className={styles.input}
            onChange={(e) => {
              setCuisine(e.target.value);
              handleInputChange(e);
            }}
          /> */}
          <div className={`flex-column ${styles.selectContainer}`}>
            <label className={`semibold ${styles.label}`}>Cuisine</label>
            <select
              className={styles.dropDownList}
              onChange={(e) => setCuisine(e.target.value)}
            >
              {cuisines && cuisines.map((c) => <option>{c.name}</option>)}
            </select>
          </div>
          <div className={`flex-row ${styles.buttons}`}>
            <MyButton
              className={styles.formButton}
              label="add item"
              onClick={(event) => handleSubmit(event)}
            />
            <MyButton
              className={styles.done}
              label="done"
              onClick={(event) => handleDone(event)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
