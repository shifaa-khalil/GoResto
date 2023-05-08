import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/admin/dropdownListRequests";
import styles from "../../css/admin/admin.module.css";

const Requests = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [restoRequests, setRestoRequests] = useState([]);
  const [approved, setApproved] = useState("");
  const [rejected, setRejected] = useState("");
  const [sortOption, setSortOption] = useState("oldest first");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getRequests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRestoRequests(response.data.restoRequests);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

  useEffect(() => {
    let sortedRequests = [...restoRequests];
    if (sortOption === "newest first") {
      sortedRequests.sort((a, b) => b.id - a.id);
    } else if (sortOption === "oldest first") {
      sortedRequests.sort((a, b) => a.id - b.id);
    }
    setRestoRequests(sortedRequests);
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleApprove = (id) => {
    console.log("before");
    axios
      .put(`http://127.0.0.1:8000/api/approveRequest/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setApproved(id);
        window.location.reload();
      })
      .catch((error) => {
        console.log("after");
        if (error.response.data.error === "Unauthorized")
          console.log("no token");
        else console.log("no access");
        console.error(error);
      });
  };

  const handleReject = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/rejectRequest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRejected(id);
        window.location.reload();
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
        <DropDownList onChange={handleSortChange} />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            {isLoading ? (
              <div className="container">
                <div className="spinner"></div>
              </div>
            ) : restoRequests.length > 0 ? (
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
                          <div className={styles.row}>
                            {approved === restoRequest.id ? (
                              <span>Approved</span>
                            ) : rejected === restoRequest.id ? (
                              <span>Rejected</span>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleApprove(restoRequest.id)}
                                >
                                  approve
                                </button>
                                <button
                                  onClick={() => handleReject(restoRequest.id)}
                                >
                                  reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>no data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
