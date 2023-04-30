import React from "react";
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import Logo from "../assets/Logo.png";
import Heart from "../assets/heart.png";
import SearchBar from "../components/searchBar";
import { useNavigation } from "@react-navigation/native";

const NavBar2 = () => {
  const navigation = useNavigation();

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
