import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

const MyLink = ({ title, onPress }) => {
  return (
    <TouchableOpacity title={title} onPress={onPress} style={[styles.link]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    backgroundColor: "transparent",
  },
  text: {
    color: "#D43325",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});

export default MyLink;
