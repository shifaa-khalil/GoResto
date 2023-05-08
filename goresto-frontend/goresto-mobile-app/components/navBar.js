import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const NavBar = () => {
  return (
    <View style={[styles.navBar]}>
      <Text style={styles.userName}>Welcome, Mahdi!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  userName: {
    fontSize: 20,
    justifySelf: "flex-end",
  },
});

export default NavBar;
