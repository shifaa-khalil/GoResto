import React, { useState } from "react";
import { Button, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

const MyButton = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />;
};

// const styles = StyleSheet.create({
//   inputContainer: { marginBottom: 20 },
//   label: { fontSize: 20, marginBottom: 5 },
//   input: {
//     width: "80%",
//     height: 40,
//     paddingLeft: 15,
//     borderColor: "#D43325",
//     borderLeftColor: "#D43325",
//     borderLeftWidth: 10,
//     borderWidth: 1,
//     fontSize: 18,
//   },
// });

export default MyButton;
