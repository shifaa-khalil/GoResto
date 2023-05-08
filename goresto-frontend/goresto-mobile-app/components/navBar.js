import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const NavBar = () => {
  const [name, setName] = useState("");

  async function getName(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setName(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }
  useEffect(() => {
    getName("name");
  }, []);

  return (
    <View style={[styles.navBar]}>
      <Text style={styles.userName}>Welcome, {name}!</Text>
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
