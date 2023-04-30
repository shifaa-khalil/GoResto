import React from "react";
import { Image, Text, View, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import Heart from "../assets/heart.png";
import Star from "../assets/Star.png";

const RestaurantCard = ({
  name,
  onPress,
  image,
  rating,
  cuisine,
  location,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card]}>
        <Image source={image} style={[styles.image]} />
        <View style={[styles.text]}>
          <Text style={[styles.name]}>{name}</Text>
          <View style={[styles.row]}>
            <Text style={[styles.rating]}>{rating}</Text>
            <Image source={Star} style={styles.star} />
            <Text style={[styles.cuisine]}>{cuisine}</Text>
          </View>
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
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 20,
  },
  location: {
    fontSize: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  star: {
    height: 20,
    width: 20,
  },
});

export default RestaurantCard;
