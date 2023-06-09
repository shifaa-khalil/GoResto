import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import polygon1 from "../images/Polygon1.png";
import polygon2 from "../images/Polygon2.png";
import MyButton from "../components/button";
import Input from "../components/input";
import logo from "../images/logo.png";
import styles from "../css/register.module.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    if (error === "") return;
    if (email || password) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) return setError("All fields are required");

    const data = { email, password };
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/login/manager`,
        data
      );
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("token", response.data.authorisation.token);
      localStorage.setItem("restaurant", response.data.restaurant);

      if (response.data.restaurant == null) navigate("/setup");
      else if (response.data.restaurant.approved === 0) navigate("/pending");
      else navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.status === "failure" &&
        error.response.data.message === "no access"
      )
        submitAdmin();
      else setError("Email/Password is wrong");
    }
  };

  const submitAdmin = async () => {
    const data = { email, password };
    await axios
      .post(`http://127.0.0.1:8000/api/login/admin`, data)
      .then((response) => {
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("token", response.data.authorisation.token);
        navigate("/requests");
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.status === "failure" &&
          error.response.data.message === "no access"
        )
          setError("If you are a customer, download our mobile app");
        else setError("Email/Password is wrong");
      });
  };

  return (
    <div className={`flex-column ${styles.registerContainer}`}>
      <div className={`flex-row ${styles.bodyContainer}`}>
        <img src={polygon1} className="polygon1" />
        <div className={`flex-column ${styles.form}`}>
          {/* <div className="logoContainer"> */}
          <img src={logo} className="logo" />
          {/* </div> */}
          <div className={styles.heading}>
            <p className="giantsize bold">Sign in</p>
          </div>
          {error && <p className={styles.error}>{error}</p>}
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
          <MyButton
            className={styles.formButton}
            label="Sign in"
            onClick={(event) => handleSubmit(event)}
          />
          <div className={`flex-row ${styles.buttons}`}>
            <span>Don't have an account?</span>
            <Link to="/register" className={styles.formLink}>
              Register instead
            </Link>
          </div>
        </div>
        <img src={polygon2} className="polygon2" />
      </div>
    </div>
  );
};

export default Signin;
