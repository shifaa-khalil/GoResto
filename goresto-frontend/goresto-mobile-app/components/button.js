import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity title={title} onPress={onPress} style={[styles.button]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    width: "40%",
    height: 40,
    padding: 5,
    backgroundColor: "#D43325",
    fontSize: 18,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MyButton;
