import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const NavCard = ({ color, text, onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, color]}>
      <Text style={[styles.text]}>{text}</Text>
      <Image source={icon} style={[styles.icon]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: 80,
    padding: 5,
    marginBottom: 20,
    borderRadius: 15,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  icon: {
    alignSelf: "flex-end",
    height: 45,
    width: 45,
  },
});

export default NavCard;
