import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ChatCard = ({ addedStyle, messageStyle, dateStyle, message, date }) => {
  return (
    <View style={[styles.card, addedStyle]}>
      <Text
        style={[styles.message, messageStyle]}
        numberOfLines={1000}
        breakMode="word-wrap"
      >
        {message}
      </Text>
      <Text style={[styles.date, dateStyle]}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 210,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
    fontSize: 11,
  },
});

export default ChatCard;
