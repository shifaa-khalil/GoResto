import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const ReviewCard = ({
  customerName,
  date,
  rating,
  review,
  //   onEdit,
  //   onCancel,
}) => {
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
      {/* <Text style={[styles.dateTime]}>
        {date} at {time}
      </Text>
      <View style={styles.details}>
        <View>
          <Text style={[styles.restaurant]}>{restaurant}</Text>
          <Text style={[styles.location]}>{location}</Text>
          <Text style={[styles.count]}>Table for: {count}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onEdit}
            style={[styles.button, styles.edit]}
          >
            <Text style={[styles.text]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCancel}
            style={[styles.button, styles.cancel]}
          >
            <Text style={[styles.text]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View> */}
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

  //   buttons: {
  //     justifyContent: "space-between",
  //     height: "100%",
  //   },
  //   button: {
  //     width: 80,
  //     height: 25,
  //   },
  //   text: {
  //     fontSize: 16,
  //     fontWeight: "bold",
  //     textAlign: "center",
  //     color: "white",
  //   },
  //   cancel: {
  //     backgroundColor: "#D43325",
  //   },
  //   edit: {
  //     backgroundColor: "#D6C02C",
  //   },
});

export default ReviewCard;
