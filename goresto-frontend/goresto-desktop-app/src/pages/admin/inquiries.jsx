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
  const [solved, setSolved] = useState("");
  const [ignored, setIgnored] = useState("");
  const [sortOption, setSortOption] = useState("newest first");

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
        <DropDownList />
        <div className={`semibold ${styles.body}`}>
          {inquiries &&
            inquiries.map((inquiry) => (
              <InquiryCard
                restaurantName={inquiry.restaurant.name}
                content={inquiry.content}
                date={new Date(inquiry.created_at).toLocaleDateString()}
                onSolve={() => handleSolve(inquiry.id)}
                onIgnore={() => handleIgnore(inquiry.id)}
                solvedStatus={inquiry.status == "solved" ? true : false}
                ignoredStatus={inquiry.status == "ignored" ? true : false}
              />
            ))}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className={styles.container}>
  //       <div>
  //         <LeftMenu requestsClassName={styles.open} />
  //       </div>
  //       <div className={`flex-column ${styles.sectionContainer}`}>
  //         <NavBar2 sectionName="Requests" className="block" />
  //         <DropDownList onChange={handleSortChange} />
  //         <div className={styles.body}>
  //           <div className={styles.tableContainer}>
  //             {restoRequests.length > 0 ? (
  //               <table>
  //                 <thead>
  //                   <tr className="semibold tr">
  //                     <th>ID</th>
  //                     <th>Name</th>
  //                     <th>Manager</th>
  //                     <th>Logo</th>
  //                     <th>Location</th>
  //                     <th>tables</th>
  //                     <th>Menu</th>
  //                     <th>approval</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {restoRequests &&
  //                     restoRequests.map((restoRequest) => (
  //                       <tr
  //                         className="normalweight mediumsize"
  //                         key={restoRequest.id}
  //                       >
  //                         <td>{restoRequest.id}</td>
  //                         <td>{restoRequest.restaurant.name}</td>
  //                         <td>{restoRequest.restaurant.manager_id}</td>
  //                         <td>{restoRequest.restaurant.logo}</td>
  //                         <td>{restoRequest.restaurant.location}</td>
  //                         <td>{restoRequest.restaurant.number_of_tables}</td>
  //                         <td>{restoRequest.restaurant.menu.menuItem}</td>
  //                         <td>
  //                           <div className={styles.row}>
  //                             {solved === restoRequest.id ? (
  //                               <span>Solved</span>
  //                             ) : ignored === restoRequest.id ? (
  //                               <span>Ignored</span>
  //                             ) : (
  //                               <>
  //                                 <button
  //                                   onClick={() => handleApprove(restoRequest.id)}
  //                                 >
  //                                   approve
  //                                 </button>
  //                                 <button
  //                                   onClick={() => handleReject(restoRequest.id)}
  //                                 >
  //                                   reject
  //                                 </button>
  //                               </>
  //                             )}
  //                           </div>
  //                         </td>
  //                       </tr>
  //                     ))}
  //                 </tbody>
  //               </table>
  //             ) : (
  //               <p>no data</p>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Inquiries;
