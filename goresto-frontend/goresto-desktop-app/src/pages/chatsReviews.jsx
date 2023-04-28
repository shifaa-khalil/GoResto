import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/chatsReviews.module.css";
import ChatCard from "../components/chatCard";
import ReviewCard from "../components/reviewCard";

const ChatsReviews = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu chatsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Chats & Reviews" className="block" />
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
            <ReviewCard
              name="Shifaa Khalil"
              rating="4"
              date="a month ago"
              content="good restaurant"
            />
            <ReviewCard
              name="Shifaa Khalil"
              rating="4"
              date="a month ago"
              content="good restaurant"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsReviews;
