import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageCard from "../components/messageCard";
import Send from "../assets/send.png";

const Conversation = ({ route }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState("");
  const [inputContent, setInputContent] = useState("");
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

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
        .get(`http://localhost:3000/user/messages/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessages(response.data.messages);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, [token, userId, chatId]);

  const handleSend = () => {
    console.log(inputContent);
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container]}>
        {/* <Text style={[styles.name]}>{}</Text> */}
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message.content}
              date={
                new Date(message.createdAt).toLocaleDateString() ==
                today.toLocaleDateString()
                  ? "today"
                  : new Date(message.createdAt).toLocaleDateString() ==
                    yesterday.toLocaleDateString()
                  ? "yesterday"
                  : new Date(message.createdAt).toLocaleDateString()
              }
              addedStyle={
                message.senderId == userId ? styles.right : styles.left
              }
              messageStyle={message.senderId == userId ? styles.white : null}
              dateStyle={message.senderId == userId ? styles.white : null}
            />
          ))
        ) : (
          <Text>No messages</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputContent}
            onChangeText={(value) => {
              setInputContent(value);
            }}
            placeholder="type here..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend}>
            <Image source={Send} style={styles.send} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 20,
  },
  spinner: {
    marginTop: 150,
  },
  left: {
    backgroundColor: "#f5f5f5",
  },
  right: {
    backgroundColor: "grey",
    alignSelf: "flex-end",
  },
  white: {
    color: "white",
  },
  input: {
    width: "90%",
    height: 40,
    paddingLeft: 15,
    borderColor: "#D43325",
    borderLeftColor: "#D43325",
    borderLeftWidth: 10,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
  },
  send: {
    height: 50,
    width: 50,
  },
});

export default Conversation;
