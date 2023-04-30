import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const MyLink = ({ title, onPress }) => {
  return (
    <Text onPress={onPress} style={[styles.link]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#D43325",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default MyLink;
