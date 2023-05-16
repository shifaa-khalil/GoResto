import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/about.module.css";
import Input from "../components/input";
import MyButton from "../components/button";

const About = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [tables, setTables] = useState("");
  const [seats, setSeats] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");
  const [deposit, setDeposit] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!logo || !tables || !location || !deposit) {
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
    setLogo(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = new FormData();
        data.append("location", location);
        data.append("number_of_tables", tables);
        data.append("number_of_seats", seats);
        data.append("logo", logo);
        data.append("deposit", deposit);
        data.append("phone_number", phoneNumber);

        axios
          .put(`http://127.0.0.1:8000/api/updateRestaurant/${id}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setSuccess("updated successfully!");
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
          });
      }
    } else navigate("/signin");
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getRestaurant`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setId(response.data.restaurant.id);
          setLogo(response.data.restaurant.logo);
          setLocation(response.data.restaurant.location);
          setTables(response.data.restaurant.number_of_tables);
          setDeposit(response.data.restaurant.deposit);
          setSeats(response.data.restaurant.number_of_seats);
          setPhoneNumber(response.data.restaurant.phone_number);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu aboutClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="About" className="block" />
        <div className={`semibold ${styles.body}`}>
          <div className={`flex-column ${styles.form}`}>
            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <Input
              label="Restaurant logo"
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
              label="Restaurant location"
              labelClassName="semibold"
              type="text"
              value={location}
              placeholder="city-street"
              className={`${styles.input} ${styles.capital}`}
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
              label="Number of tables"
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
              label="Number of seats"
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
              label="Average per person"
              labelClassName="semibold"
              type="text"
              value={deposit}
              placeholder="type here"
              className={styles.input}
              onChange={(e) => {
                setDeposit(e.target.value);
                handleInputChange(e);
              }}
            />
            <MyButton
              className={styles.formButton}
              label="Update"
              onClick={(event) => handleSubmit(event)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
