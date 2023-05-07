import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import Input from "../components/input";
import styles from "../css/setup.module.css";
import MyButton from "../components/button";

const Setup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [tables, setTables] = useState("");
  const [seats, setSeats] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deposit, setDeposit] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const validateForm = () => {
    let isValid = true;
    if (!name || !logo || !tables || !location || !deposit || !phoneNumber) {
      setError("All fields are required");
      isValid = false;
    }
    return isValid;
  };

  const handleInputChange = (event) => {
    setError(event.target.value);
    if (validateForm) {
      setError("");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = new FormData();
        data.append("name", name);
        data.append("location", location);
        data.append("number_of_tables", tables);
        data.append("number_of_seats", seats);
        data.append("logo", logo);
        data.append("deposit", deposit);
        data.append("phone_number", phoneNumber);

        axios
          .post(`http://127.0.0.1:8000/api/addRestaurant`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            navigate("/menu");
            // localStorage.setItem("name", response.data.message.name);
          })
          .catch((error) => {
            console.error(error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.status === "failure" &&
              error.response.data.message === "taken"
            )
              setError("Name is taken");
            else if (
              error.response &&
              error.response.data &&
              error.response.data.status === "failure" &&
              error.response.data.message ===
                "you already added a restaurant on this account"
            )
              setError("You already added a restaurant on this account");
          });
      }
    } else navigate("/signin");
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu overlay={styles.overlay} parent={styles.parent} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Setup" className="hidden" />
        <div className={`flexcolumn ${styles.form}`}>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            label="Enter the name of your restaurant"
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
            label="Upload the logo of your restaurant"
            labelClassName="semibold"
            type="file"
            placeholder="file name"
            className={styles.input}
            onChange={(e) => {
              setLogo(e.target.files[0]);
              handleFileChange(e);
            }}
          />
          <Input
            label="Add the location of your restaurant"
            labelClassName="semibold"
            type="text"
            value={location}
            placeholder="city-street"
            className={styles.input}
            onChange={(e) => {
              setLocation(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Add the phone number of your restaurant"
            labelClassName="semibold"
            type="text"
            value={phoneNumber}
            placeholder="00-000-000"
            className={styles.input}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Enter the number of tables in your restaurant"
            labelClassName="semibold"
            type="text"
            value={tables}
            placeholder="eg. 15"
            className={styles.input}
            onChange={(e) => {
              setTables(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            label="Add the number of seats in your restaurant"
            labelClassName="semibold"
            type="text"
            value={seats}
            placeholder="eg. 15"
            className={styles.input}
            onChange={(e) => {
              setSeats(e.target.value);
              handleInputChange(e);
            }}
          />

          <Input
            label="Add the average lunch cost per person in your restaurant"
            labelClassName="semibold"
            type="text"
            value={deposit}
            placeholder="eg. 40"
            className={styles.input}
            onChange={(e) => {
              setDeposit(e.target.value);
              handleInputChange(e);
            }}
          />
          <MyButton
            className={styles.formButton}
            label="Submit"
            onClick={(event) => handleSubmit(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default Setup;
