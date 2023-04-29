import * as React from "react";
import { Image, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";
import Signin from "../screens/signin";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <NavBar />
      <Image source={GoPro} style={[styles.heading]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    width: 260,
    height: 30,
    marginBottom: 40,
    marginTop: 20,
  },
});

export default Home;
