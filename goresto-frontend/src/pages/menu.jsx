import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import MenuItem from "../components/menuItem";
import Input from "../components/input";
import MyButton from "../components/button";
import Food from "../images/french.jpg";
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
  const [menuItems, setMenuItems] = useState(localStorage.getItem("menuItems"));

  const validateForm = () => {
    let isValid = true;
    if (!name || !image || !description || !price) {
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

  const handleDone = (event) => {
    event.preventDefault();
    if (token) {
      if (menuItems < 10) setError("Add at least 10 items");
      else navigate("/dashboard");
    } else navigate("/signin");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = new FormData();
        data.append("name", name);
        data.append("image", image);
        data.append("description", description);
        data.append("price", price);
        data.append("category", category);
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
            setCuisine("");
            setSuccess("Item added successfully!");
            // navigate("/pending");
            // localStorage.setItem("name", response.data.message.name);
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

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu menuClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Menu" className="block" />
        <div className={`${styles.body}`}>
          <div className={`flex-column ${styles.form}`}>
            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}
            <Input
              label="Name"
              labelClassName="semibold"
              type="text"
              value={name}
              placeholder="type here"
              className={styles.input}
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
            <Input
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
            />
            <div className="flex-row">
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
          <div className={styles.screen}>
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
            <MenuItem
              image={Food}
              name="burger"
              description="with cheese, lettus, mustard"
              price="$15"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
