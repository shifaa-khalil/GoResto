import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Logo from "../assets/Logo.png";

const NavBar = ({ navigation }) => {
  return (
    <View style={[styles.navBar]}>
      <Image source={Logo} style={[styles.logo]} />
      <View style={[styles.navLinks]}>
        <Text style={[styles.text]} onPress={() => navigation.navigate("")}>
          Contact
        </Text>
        <Text style={[styles.text]} onPress={() => navigation.navigate("")}>
          Sign in
        </Text>
      </View>
    </View>
    // <TouchableOpacity title={title} onPress={onPress} style={[styles.link]}>
    //   <Text style={styles.text}>{title}</Text>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // height: 70,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    padding: 20,
  },
  logo: {
    height: 40,
    width: 70,
  },
  navLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 8,
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
});

export default NavBar;
