import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/inquiry.module.css";
import MyButton from "../components/button";

const Inquiry = () => {
  const navigate = useNavigate();
  const [inquiryContent, setInquiryContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const validateForm = () => {
    let isValid = true;
    if (!inquiryContent) {
      setError("Inquiry field can't be empty");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (token) {
      if (validateForm()) {
        const data = { content: inquiryContent };
        axios
          .post(`http://127.0.0.1:8000/api/inquiry`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setSuccess("Inquiry added successfully!");
            setInquiryContent("");
          })
          .catch((error) => {
            console.error(error);
          });
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
          <textarea
            type="text"
            value={inquiryContent}
            placeholder="type here"
            className={`smallsize ${styles.input}`}
            onChange={(e) => {
              setInquiryContent(e.target.value);
              setError("");
              setSuccess("");
            }}
          />
          <MyButton
            className={styles.formButton}
            label="Submit"
            onClick={(event) => handleSubmit(event)}
          />
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
