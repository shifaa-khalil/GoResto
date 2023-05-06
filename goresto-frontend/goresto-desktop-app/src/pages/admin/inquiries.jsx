import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/admin/dropDownListInquiries";
import InquiryCard from "../../components/admin/inquiryCard";
import styles from "../../css/admin/inquiries.module.css";

const Inquiries = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("pending");

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredInquiries = () => {
    switch (selectedFilter) {
      case "pending":
        return inquiries.filter((i) => i.status === "pending");
      case "solved":
        return inquiries.filter((i) => i.status === "solved");
      case "ignored":
        return inquiries.filter((i) => i.status === "ignored");
      case "all":
      default:
        return inquiries;
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getInquiries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setInquiries(response.data.inquiries);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

  const handleSolve = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/solveInquiry/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error === "Unauthorized")
          console.log("no token");
        else console.log("no access");
        console.error(error);
      });
  };

  const handleIgnore = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/ignoreInquiry/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.data.error === "Unauthorized")
          console.log("no token");
        else console.log("no access");
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu inquiriesClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Inquiries" />
        <DropDownList onChange={handleFilter} />
        <div className={`semibold ${styles.body}`}>
          {filteredInquiries().length > 0 ? (
            filteredInquiries().map((inquiry) => (
              <InquiryCard
                restaurantName={inquiry.restaurant.name}
                content={inquiry.content}
                date={new Date(inquiry.created_at).toLocaleDateString()}
                onSolve={() => handleSolve(inquiry.id)}
                onIgnore={() => handleIgnore(inquiry.id)}
                solvedStatus={inquiry.status == "solved" ? true : false}
                ignoredStatus={inquiry.status == "ignored" ? true : false}
              />
            ))
          ) : (
            <p>no data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
