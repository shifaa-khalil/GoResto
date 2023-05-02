import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const CategoryCard = ({ text, onPress, image }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card]}>
      <Image source={image} style={[styles.image]} />
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 135,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  },
  image: {
    height: 120,
    width: "100%",
    borderRadius: 15,
  },
});

export default CategoryCard;
