import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ChatCard = ({ name, lastMessage, date, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card]} onPress={onPress}>
      <Text style={[styles.name]}>{name}</Text>
      <View style={styles.row}>
        <Text style={[styles.lastMessage]}>{lastMessage}</Text>
        <Text style={[styles.date]}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    paddingVertical: 20,
    justifyContent: "space-between",
    height: 260,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
  },
  lastMessage: {
    fontSize: 15,
  },
  date: {
    // alignSelf: "flex-end",
    fontSize: 13,
  },
});

export default ChatCard;
