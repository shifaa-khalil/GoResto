import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const NavBar = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  // async function getToken(key) {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     // return value !== null ? JSON.parse(value) : null;
  //     setToken(JSON.parse(value));
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // }

  // useEffect(() => {
  //   getToken("token");
  // }, []);

  async function getName(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setName(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  async function removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getName("name");
  }, []);

  return (
    <View style={[styles.navBar]}>
      <Text style={styles.userName}>Welcome, {name}!</Text>
      <Text
        style={styles.link}
        onPress={() => {
          removeData("name");
          removeData("token");
          window.location.replace("Home");
        }}
      >
        Sign out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    alignItems: "flex-end",
    // justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  userName: {
    fontSize: 20,
    justifySelf: "flex-end",
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default NavBar;
