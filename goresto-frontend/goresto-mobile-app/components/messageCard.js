import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ChatCard = ({ message, date, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <Text style={[styles.message]} numberOfLines={1000} breakMode="word-wrap">
        {message}
      </Text>
      <Text style={[styles.date]}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#d43325",
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
    color: "white",
  },
  message: {
    fontSize: 15,
    color: "white",
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "white",
  },
});

export default ChatCard;
