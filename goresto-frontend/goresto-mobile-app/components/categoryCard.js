import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

const CategoryCard = ({ text, onPress, image }) => {
  return (
    <View onPress={onPress} style={[styles.card]}>
      <Image source={image} style={[styles.image]} />
      <Text style={[styles.text]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 125,

    // width: 310,
    // height: 80,
    // padding: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    // marginBottom: 10,
  },
  image: {
    height: 90,
    width: "100%",
  },
});

export default CategoryCard;
