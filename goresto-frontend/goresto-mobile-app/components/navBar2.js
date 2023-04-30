import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Signin from "../screens/signin";
import Logo from "../assets/Logo.png";
import Heart from "../assets/heart.png";
import SearchBar from "../components/searchBar";

const NavBar2 = ({ navigation }) => {
  return (
    <View style={[styles.navBar]}>
      <Image source={Logo} style={[styles.logo]} />
      <SearchBar />
      <Image source={Heart} />
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
  logo: {
    height: 40,
    width: 70,
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 12,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
});

export default NavBar2;
