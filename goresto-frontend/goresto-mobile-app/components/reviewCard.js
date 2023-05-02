import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const ReviewCard = ({
  restaurant,
  date,
  time,
  location,
  count,
  onEdit,
  onCancel,
}) => {
  return (
    <View style={[styles.card]}>
      <View style={styles.row}>
        <Text style={[styles.name]}>Name</Text>
        <Text style={[styles.rating]}>Rating</Text>
      </View>
      <Text style={[styles.review]}>
        The food was exquisite, with a perfect blend of flavors and textures.
        The service was exceptional, with a warm and welcoming atmosphere.
        Overall, a truly memorable dining experience that I would highly
        recommend
      </Text>
      <Text style={[styles.date]}>1 month ago</Text>
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
    height: 280,
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
    // fontWeight: 600,
    alignSelf: "flex-end",
    fontSize: 13,
  },
  review: {
    fontWeight: 600,
    fontSize: 15,
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
