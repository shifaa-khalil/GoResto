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
  const [receiverNames, setReceiverNames] = useState([]);
  const [receiverName, setReceiverName] = useState("Unknown");
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [customers, setCustomers] = useState([]);

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
    axios
      .post(`http://localhost:3000/user/message`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMessages([...messages, response.data]);
        setMessageContent("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken) {
        setUserId(decodedToken.sub);
      }
      axios
        .get(`http://localhost:3000/user/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setChats(response.data.chats);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, []);

  useEffect(() => {
    let names = [];

    chats &&
      chats.map((chat) => {
        let receiverId;
        if (chat.firstUserId == userId) receiverId = chat.secondUserId;
        else if (chat.secondUserId == userId) receiverId = chat.firstUserId;

        axios
          .get(`http://localhost:8000/api/getUserName/${receiverId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            names.push(response.data.userName);
            if (chats.length == names.length) {
              setIsLoading(false);
              setReceiverNames(names);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [chats]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/searchCustomer/${searchInput}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchInput]);

  return (
    <div className={styles.container}>
      <div>
        <LeftMenu chatsClassName={styles.open} />
      </div>
      <div className={`flex-column ${styles.sectionContainer}`}>
        <NavBar2 sectionName="Chats" className="block" />
        <div className={styles.body}>
          <div className={`semibold flex-column ${styles.chats}`}>
            <SearchBar
              onChange={(event) => setSearchInput(event.target.value)}
            />
            {isLoading ? (
              <div className="container">
                <div className="spinner"></div>
              </div>
            ) : searchInput && customers ? (
              customers.map((customer) => {
                return <ChatCard key={customer.id} name={customer.name} />;
              })
            ) : receiverNames ? (
              chats.map((chat, i) => {
                return (
                  <ChatCard
                    key={chat.chatId}
                    name={receiverNames[i]}
                    content={chat.lastMessage.content}
                    dateTime={new Date(
                      chat.lastMessage.createdAt
                    ).toLocaleDateString()}
                    onClick={() => {
                      setActiveChatId(chat.chatId);
                      setReceiverName(receiverNames[i]);
                      openChat();
                    }}
                  />
                );
              })
            ) : (
              <p>no chats! Search for a user and start a chat</p>
            )}
          </div>
          <div
            className={messages.length > 0 ? styles.conversation : styles.none}
          >
            <span className={`semibold mediumsize ${styles.name}`}>
              {receiverName}
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
