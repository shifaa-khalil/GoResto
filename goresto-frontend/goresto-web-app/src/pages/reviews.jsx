import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/reviews.module.css";
import ChatCard from "../components/chatCard";
import ReviewCard from "../components/reviewCard";

const Reviews = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // if (token) {
    axios
      .get(`http://127.0.0.1:8000/api/getReviewsRestaurant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
    // } else navigate("/signin");
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu reviewsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Reviews" className="block" />
        <div className={styles.body}>
          <div className={`semibold flex-column ${styles.chats}`}>
            <ChatCard
              name="Shifaa Khalil"
              lastMessage="nog vhbh bjjbhjjjhjhjhjhh jbbghghvgb"
            />
            <ChatCard
              name="Shifaa Khalil"
              lastMessage="nog vhbh bjjbhjjjhjhjhjhh jbbghghvgb"
            />
            <ChatCard
              name="Shifaa Khalil"
              lastMessage="nog vhbh bjjbhjjjhjhjhjhh jbbghghvgb"
            />
          </div>
          <div className={`semibold ${styles.reviews}`}>
            {reviews &&
              reviews.map((review) => (
                <ReviewCard
                  name={review.customer_id}
                  rating={review.rating}
                  date={new Date(review.created_at).toLocaleDateString()}
                  content={review.content}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
