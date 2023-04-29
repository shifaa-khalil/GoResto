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
        <Text onPress={() => navigation.navigate("")}>Contact</Text>
        <Text onPress={() => navigation.navigate("")}>Sign in</Text>
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
  },
  logo: {
    // flexBasis: "30%",
  },
  navLinks: {
    flexBasis: "30%",
    fontSize: 18,
  },
});

export default NavBar;
