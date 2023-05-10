import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatCard from "../components/chatCard";
import { URL } from "../configs/URL";

const Conversation = ({ route }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    getData("token");
    setChatId(route.params.chatId);
  }, []);

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
        .get(`http://localhost:3000/user/messages/645558c94334b9a4c661f3cd`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.messages);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, [token, userId, chatId]);

  return (
    <Text>Hello</Text>
    // <ScrollView
    //   style={styles.screenContainer}
    //   showsVerticalScrollIndicator={false}
    // >
    //   <View style={[styles.container]}>
    //   <Text style={[styles.name]}>{name}</Text>
    //     {isLoading ? (
    //       <View style={styles.spinner}>
    //         <ActivityIndicator size="large" color="#d43325" />
    //       </View>
    //     ) : chats.length > 0 ? (
    //       chats.map((chat) => (
    //         <MessageCard
    //           key={chat.id}
    //           lastMessage={chat.lastMessage.content}
    //           date={new Date(chat.lastMessage.createdAt).toLocaleDateString()}
    //           name={chat.firstUserId}
    //           onPress={() => console.log("messageCard")}
    //         />
    //       ))
    //     ) : (
    //       <Text>No chats</Text>
    //     )}
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
  },
  backgroundImage: {
    height: 250,
    resizeMode: "contain",
  },
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: "#D43325",
    padding: 20,
    borderRadius: 10,
    marginTop: 200,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  modalText: {
    color: "white",
  },
  spinner: {
    marginTop: 150,
  },
});

export default Conversation;
