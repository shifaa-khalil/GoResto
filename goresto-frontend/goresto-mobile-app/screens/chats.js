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

const Chats = ({ route }) => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  //   const [receiverId, setReceiverId] = useState("");
  const [receiverNames, setReceiverNames] = useState("");
  const [done, setDone] = useState(false);

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
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.sub);

      axios
        .get(`http://localhost:3000/user/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setChats(response.data.chats);
          console.log(response.data.chats);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("no token");
  }, [token, userId]);

  var i = -1;

  useEffect(() => {
    let names = [];

    chats &&
      chats.map((chat) => {
        let receiverId;
        if (chat.firstUserId == userId) receiverId = chat.secondUserId;
        else if (chat.secondUserId == userId) receiverId = chat.firstUserId;

        axios
          .get(`${URL}/api/getUserName/${receiverId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            names.push(response.data.userName);
            if (chats.length == names.length) {
              setDone(true);
              setIsLoading(false);
              setReceiverNames(names);
            }
            console.log(names);
            console.log(receiverNames);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, [chats]);

  //   const getReceiverName = (firstUserId, secondUserId) => {
  //     let receiverId;
  //     if (firstUserId == userId) receiverId = secondUserId;
  //     else if (secondUserId == userId) receiverId = firstUserId;

  //     axios
  //       .get(`${URL}/api/getUserName/${receiverId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         // receiverNames.push(response.data.userName);
  //         console.log(response.data.userName);
  //         return response.data.userName;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  return (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container]}>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : receiverNames ? (
          chats.map((chat) => {
            // const receiverName = getReceiverName(
            //   chat.firstUserId,
            //   chat.secondUserId
            // );
            console.log(receiverNames);
            i = i + 1;
            return (
              <ChatCard
                key={chat.chatId}
                lastMessage={chat.lastMessage.content}
                date={new Date(chat.lastMessage.createdAt).toLocaleDateString()}
                name={receiverNames[i]}
                onPress={() =>
                  navigation.navigate("Conversation", {
                    chatId: chat.chatId,
                  })
                }
              />
            );
          })
        ) : (
          <Text>No chats</Text>
        )}
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

export default Chats;
