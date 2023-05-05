import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import NavBar2 from "../components/navBar2";
import LeftMenu from "../components/leftMenu";
import styles from "../css/chats.module.css";
import ChatCard from "../components/chatCard";
import MessageCard from "../components/messageCard";
import Send from "../images/send.png";
import SearchBar from "../components/searchBar";

const Chats = () => {
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [inputText, setInputText] = useState("");
  const [chats, setChats] = useState([]);

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get(`http://localhost:3000/user/messages/6455273d3372d15408f88421`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => console.log(response))
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else console.log("no token");
  // }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/user/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setChats(response.data.chats))
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu chatsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Chats" className="block" />
        <div className={styles.body}>
          <div className={`semibold flex-column ${styles.chats}`}>
            <SearchBar />
            {chats &&
              chats.map((chat) => (
                <ChatCard
                  name="Shifaa Khalil"
                  content={chat.lastMessage.content}
                  dateTime={new Date(
                    chat.lastMessage.createdAt
                  ).toLocaleDateString()}
                />
              ))}
          </div>
          <div className={styles.conversation}>
            <span className={`semibold mediumsize ${styles.name}`}>Name</span>
            <div className={styles.messages}>
              <MessageCard />
              <MessageCard className={styles.right} />
              <MessageCard />
              <MessageCard />
              <MessageCard className={styles.right} />
              <MessageCard className={styles.right} />
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputText}
                placeholder="type your message here..."
                onChange={(event) => setInputText(event.target.value)}
                className={styles.input}
              />
              <img src={Send} className={styles.send} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
