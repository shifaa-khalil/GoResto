import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const MenuItem = ({ itemName, onPress, image, price }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card]}>
      <Image source={image} style={[styles.itemImage]} />
      <Text style={[styles.itemName]}>{itemName}</Text>
      <Text style={[styles.price]}>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 125,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },
  itemImage: {
    height: 90,
    width: "100%",
    borderRadius: 10,
  },
});

export default MenuItem;
