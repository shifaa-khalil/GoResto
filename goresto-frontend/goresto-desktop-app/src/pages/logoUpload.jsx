import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import Input from "../components/input";
import styles from "../css/setup.module.css";
import MyButton from "../components/button";

const LogoUpload = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!logo) {
      setError("All fields are required");
      isValid = false;
    }
    return isValid;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };
  const handleLogoUpload = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("logo", logo);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/uploadLogo",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/menu");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
      <button onClick={handleLogoUpload}>upload</button>
    </>
  );
};
export default LogoUpload;
