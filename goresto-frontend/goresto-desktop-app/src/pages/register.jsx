import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import NavBar from "../components/navBar";
import Input from "../components/input";
import gopro from "../images/GoPro.png";
import styles from "../css/register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      isValid = false;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
      isValid = false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = { name, email, password, confirmPassword };
      axios
        .post(`http://127.0.0.1:8000/api/register/manager`, data)
        .then((response) => {
          navigate("/setup");
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("token", response.data.authorisation.token);
        })
        .catch((error) => {
          console.error(error);
          setError("Email already exists");
        });
    }
  };

  return (
    <div className={`flex-column ${styles.registerContainer}`}>
      <NavBar />
      <div className={`flex-row ${styles.bodyContainer}`}>
        <img src={polygon1} className="polygon1" />
        <div className={`flex-column ${styles.form}`}>
          <div className={styles.heading}>
            <p className="giantsize bold">Register</p>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <Input
            type="text"
            label="Name"
            value={name}
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            placeholder="example@domain.com"
            className={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="********"
            className={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange(e);
            }}
          />
          <Input
            type="password"
            label="Confirm password"
            value={confirmPassword}
            placeholder="********"
            className={styles.input}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleInputChange(e);
            }}
          />
          <MyButton
            className={styles.formButton}
            label="Register"
            onClick={(event) => handleSubmit(event)}
          />
          <div className={`flex-row ${styles.buttons}`}>
            <span>Don't have an account?</span>
            <Link to="/signin" className={styles.formLink}>
              Sign in instead
            </Link>
          </div>
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Register;
