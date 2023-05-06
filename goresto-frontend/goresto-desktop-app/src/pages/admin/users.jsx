import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import NavBar2 from "../../components/navBar2";
import LeftMenu from "../../components/admin/leftMenu";
import DropDownList from "../../components/admin/dropDownListUsers";
import styles from "../../css/admin/admin.module.css";

const Users = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [removed, setRemoved] = useState("");

  const navigate = useNavigate();

  const handleFilter = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredUsers = () => {
    switch (selectedFilter) {
      case "managers":
        return users.filter((u) => u.role === "manager");
      case "customers":
        return users.filter((u) => u.role === "customer");
      case "all":
      default:
        return users;
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get(`http://127.0.0.1:8000/api/getUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error(error);
        });
    } else navigate("/signin");
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRemoved(id);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu usersClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Users" className="block" />
        <DropDownList onChange={handleFilter} />
        <div className={styles.body}>
          <div className={styles.tableContainer}>
            {filteredUsers().length > 0 ? (
              <table>
                <thead>
                  <tr className="semibold tr">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined in</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    filteredUsers().map((user) => (
                      <tr className="normalweight mediumsize" key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td></td>
                        <td>
                          {removed == user.id ? (
                            <span>Removed</span>
                          ) : (
                            <button onClick={() => handleRemove(user.id)}>
                              remove
                            </button>
                          )}
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

export default Users;
