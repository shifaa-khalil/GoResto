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
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [activeChatId, setActiveChatId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const openChat = () => {
    if (token) {
      axios
        .get(`http://localhost:3000/user/messages/${activeChatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (!token) return console.log("no token");

    // if (validateForm()) {
    const data = { chatId: activeChatId, content: messageContent };
    console.log(data);
    axios
      .post(`http://localhost:3000/user/message`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setMessageContent("");
      })
      .catch((error) => {
        console.error(error);
        console.log("error", error);
      });
  };

  // const renderChatCards = () => {
  //   {
  //     chats &&
  //       chats.map((chat) => {
  //         if (chat.firstUserId == userId) setReceiverId(chat.secondUserId);
  //         else if (chat.secondUserId == userId) setReceiverId(chat.firstUserId);
  //         else setReceiverName("Unknown");

  //         axios
  //           .get(`http://localhost:8000/api/getUserName/${receiverId}`, {
  //             headers: { Authorization: `Bearer ${token}` },
  //           })
  //           .then((response) => setReceiverName(response.data.userName))
  //           .catch((error) => {
  //             console.error(error);
  //           });

  //         return (
  //           <ChatCard
  //             name={receiverName}
  //             content={chat.lastMessage.content}
  //             dateTime={new Date(
  //               chat.lastMessage.createdAt
  //             ).toLocaleDateString()}
  //             onClick={() => {
  //               setActiveChatId(chat.chatId);
  //               openChat();
  //             }}
  //           />
  //         );
  //       });
  //   }
  // };

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        console.log("decodedToken.sub", decodedToken.sub);
        setUserId(decodedToken.sub);
      } else console.log("not decoded");

      if (userId) console.log("userId", userId);
      else console.log("no userId");
      axios
        .get(`http://localhost:3000/user/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setChats(response.data.chats);
        })
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
            {/* {renderChatCards} */}
            {chats &&
              chats.map((chat) => (
                <ChatCard
                  name="Unknown"
                  content={chat.lastMessage.content}
                  dateTime={new Date(
                    chat.lastMessage.createdAt
                  ).toLocaleDateString()}
                  onClick={() => {
                    setActiveChatId(chat.chatId);
                    openChat();
                  }}
                />
              ))}
          </div>
          <div
            className={messages.length > 0 ? styles.conversation : styles.none}
          >
            <span className={`semibold mediumsize ${styles.name}`}>
              Unknown
            </span>
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
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={messageContent}
                placeholder="type your message here..."
                onChange={(event) => setMessageContent(event.target.value)}
                className={styles.input}
              />
              <img src={Send} className={styles.send} onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
