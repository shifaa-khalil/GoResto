import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ChatCard = ({ message, date, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <Text
        style={[styles.lastMessage]}
        numberOfLines={1000}
        breakMode="word-wrap"
      >
        {message}
      </Text>
      <Text style={[styles.date]}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
  },
  message: {
    fontSize: 15,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 13,
  },
});

export default ChatCard;
