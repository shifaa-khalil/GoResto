import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";
import FilterBar from "../components/filterBar";
import Heart from "../assets/heart.png";
import SearchBar from "../components/searchBar";
import { useNavigation } from "@react-navigation/native";

const NavBar2 = ({ onChangeText, value, image }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.navBar]}>
      <SearchBar value={value} onChangeText={onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  heart: {
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 18,
  },
});

export default NavBar2;
