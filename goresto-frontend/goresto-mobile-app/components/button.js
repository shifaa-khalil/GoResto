import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity title={title} onPress={onPress} style={[styles.button]}>
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 40,
    padding: 5,
    backgroundColor: "#D43325",
    justifyContent: "center",
    borderRadius: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyButton;
