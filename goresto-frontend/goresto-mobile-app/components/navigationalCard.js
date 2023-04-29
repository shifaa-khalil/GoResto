import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";

const NavCard = ({ text, onPress, icon }) => {
  return (
    <View onPress={onPress} style={[styles.card]}>
      <Text style={styles.text}>{text}</Text>
      <Image source={icon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 310,
    height: 80,
    backgroundColor: "#D43325",
    padding: 5,
    marginBottom: 20,
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
