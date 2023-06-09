import React from "react";
import { Image, Text, View, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import Heart from "../assets/heart.png";
import Star from "../assets/Star.png";

const RestaurantCard = ({ name, onPress, image, rating, location }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card]}>
        <Image
          source={{ uri: image }}
          style={[styles.image]}
          accessibilityLabel="No image"
        />
        <View style={[styles.text]}>
          <Text style={[styles.name]} numberOfLines={1}>
            {name}
          </Text>
          {rating ? (
            <View style={[styles.row]}>
              <Text style={[styles.rating]}>{rating}</Text>
              <Image source={Star} style={styles.star} />
            </View>
          ) : (
            <Text>No ratings</Text>
          )}

          <Text style={[styles.location]} numberOfLines={1}>
            {location}
          </Text>
        </View>
        <Image source={Heart} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    height: "100%",
    justifyContent: "center",
    flexBasis: "40%",
  },
  image: {
    height: "100%",
    width: "35%",
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 20,
  },
  location: {
    fontSize: 18,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  star: {
    height: 20,
    width: 20,
  },
});

export default RestaurantCard;
