import React, { useState } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

const CommentCard = ({ customer, date, comment }) => {

  return (
    <View style={styles.commentCard}>
      <View style={styles.row}>
        <Text style={[styles.name]}>{customer}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.review}>
        <Text>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  reviewCard: {
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
  rating: {
    fontWeight: 600,
    fontSize: 20,
  },
  date: {
    alignSelf: "flex-end",
    fontSize: 13,
  },
  content: {
    fontWeight: 600,
    fontSize: 15,
  },
  review: {
    flexBasis: "55%",
  },
  button: {
    width: 70,
    height: 20,
    borderRadius: 15,
    backgroundColor: "#D43325",
    alignSelf: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  commentCard: {
    marginLeft: 50,
    width: 260,
    paddingVertical: 20,
    justifyContent: "space-between",
    height: 120,
  },
});

export default CommentCard;
