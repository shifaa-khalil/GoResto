import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/Logo.png";

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.navBar]}>
      <Image source={Logo} style={[styles.logo]} />
      <View style={[styles.navLinks]}>
        <Text style={[styles.text]} onPress={() => navigation.navigate("")}>
          Contact
        </Text>
        <Text
          style={[styles.text]}
          onPress={() => navigation.navigate("Signin")}
        >
          Sign in
        </Text>
      </View>
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

export default NavBar;
