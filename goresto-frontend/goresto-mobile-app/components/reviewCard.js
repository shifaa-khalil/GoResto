import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const ReviewCard = ({ customerName, date, rating, review, onComment }) => {
  return (
    <View style={[styles.card]}>
      <View style={styles.row}>
        <Text style={[styles.name]}>{customerName}</Text>
        <Text style={[styles.rating]}>{rating}</Text>
      </View>
      <View style={styles.review}>
        <Text style={[styles.content]}>{review}</Text>
      </View>
      <Text style={[styles.date]}>{date}</Text>
      <TouchableOpacity onPress={onComment} style={[styles.button]}>
        <Text style={[styles.text]}>Comment</Text>
      </TouchableOpacity>
    </View>
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
    flexBasis: "70%",
  },
  button: {
    width: 70,
    height: 20,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: "#D43325",
    alignSelf: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default ReviewCard;
