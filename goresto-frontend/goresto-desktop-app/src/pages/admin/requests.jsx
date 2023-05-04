import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/dropDownList";
import styles from "../../css/admin/admin.module.css";

const Admin = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [restoRequests, setRestoRequests] = useState([]);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    // if (token) {
    axios
      .get(`http://127.0.0.1:8000/api/getRequests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRestoRequests(response.data.restoRequests);
      })
      .catch((error) => {
        console.error(error);
      });
    // } else navigate("/signin");
  }, []);

  const handleApprove = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/approveRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setApproved(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu requestsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Requests" className="block" />
        <DropDownList />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr className="semibold tr">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Manager</th>
                  <th>Logo</th>
                  <th>Location</th>
                  <th>tables</th>
                  <th>Menu</th>
                  <th>approval</th>
                </tr>
              </thead>
              <tbody>
                {restoRequests &&
                  restoRequests.map((restoRequest) => (
                    <tr
                      className="normalweight mediumsize"
                      key={restoRequest.id}
                    >
                      <td>{restoRequest.id}</td>
                      <td>{restoRequest.restaurant.name}</td>
                      <td>{restoRequest.restaurant.manager_id}</td>
                      <td>{restoRequest.restaurant.logo}</td>
                      <td>{restoRequest.restaurant.location}</td>
                      <td>{restoRequest.restaurant.number_of_tables}</td>
                      <td>{restoRequest.restaurant.menu.menuItem}</td>
                      <td>
                        {approved ? (
                          <span>Approved</span>
                        ) : (
                          <>
                            <button onClick={handleApprove(restoRequest.id)}>
                              approve
                            </button>
                            <button onClick={() => console.log("rejected")}>
                              reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
