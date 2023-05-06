import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
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
  const [messages, setMessages] = useState([]);
  // const userId = useSelector((state) => state.auth.userId);
  const [userId, setUserId] = useState("");
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3000/user/messages/64552810f805d155f62b7ff6`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessages(response.data.messages);
          console.log(messages);
          if (decodedToken) {
            console.log("decodedToken.sub", decodedToken.sub);
            setUserId(decodedToken.sub);
          } else console.log("not decoded");
          if (userId) console.log("userId", userId);
          else console.log("no userId");
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, []);

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
              {messages &&
                messages.map((message) => (
                  <MessageCard
                    content={message.content}
                    dateTime={new Date(message.createdAt).toLocaleTimeString()}
                    className={
                      message.senderId == userId ? styles.right : styles.left
                    }
                  />
                ))}
              {/* <MessageCard className={styles.right} />
              <MessageCard />
              <MessageCard />
              <MessageCard className={styles.right} />
              <MessageCard className={styles.right} /> */}
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
