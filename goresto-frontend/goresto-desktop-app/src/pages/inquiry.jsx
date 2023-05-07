import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import Input from "../components/input";
import styles from "../css/inquiry.module.css";
import MyButton from "../components/button";

const Inquiry = () => {
  const navigate = useNavigate();
  const [inquiryContent, setInquiryContent] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const validateForm = () => {
    let isValid = true;
    if (!inquiryContent) {
      setError("Inquiry field can't be empty");
      isValid = false;
    }
    return isValid;
  };

  //   const handleInputChange = (event) => {
  //     setError(event.target.value);
  //     if (validateForm) {
  //       setError("");
  //     }
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = new FormData();
        data.append("content", inquiryContent);

        // axios
        //   .post(`http://127.0.0.1:8000/api/addInquiry`, data, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       "Content-Type": "multipart/form-data",
        //     },
        //   })
        //   .then((response) => {
        //     navigate("/menu");
        //     // localStorage.setItem("name", response.data.message.name);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     if (
        //       error.response &&
        //       error.response.data &&
        //       error.response.data.status === "failure" &&
        //       error.response.data.message === "taken"
        //     )
        //       setError("Name is taken");
        //     else if (
        //       error.response &&
        //       error.response.data &&
        //       error.response.data.status === "failure" &&
        //       error.response.data.message ===
        //         "you already added a restaurant on this account"
        //     )
        //       setError("You already added a restaurant on this account");
        //   });
      }
    } else navigate("/signin");
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu inquiryClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Inquiries" className="hidden" />
        <div className={`flex-column ${styles.form}`}>
          {error && <p className={styles.error}>{error}</p>}
          <textarea
            type="text"
            value={inquiryContent}
            placeholder="type here"
            className={styles.input}
            onChange={(e) => {
              setInquiryContent(e.target.value);
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

export default Inquiry;
