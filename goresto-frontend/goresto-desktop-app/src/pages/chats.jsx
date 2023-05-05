import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/chatsReviews.module.css";
import ChatCard from "../components/chatCard";

const Chats = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu chatsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Chats" className="block" />
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
          <div className={styles.conversation}>
            <p>Name</p>
            <div className={styles.messages}></div>
            <div className={styles.inputContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
