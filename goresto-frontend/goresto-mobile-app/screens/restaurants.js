import * as React from "react";
import { ScrollView, Image, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar from "../components/navBar";
import Signin from "../screens/signin";
import NavCard from "../components/navigationalCard";
import Reservations from "../assets/reservationsWhite.png";
import Chats from "../assets/chatsWhite.png";
import DownArrow from "../assets/downArrow.png";
import Chinese from "../assets/chinese.png";
import Japanese from "../assets/japanese.png";
import Italian from "../assets/italian.png";
import Lebanese from "../assets/lebanese.png";
import French from "../assets/french.png";
import Indian from "../assets/indian.png";
import CategoryCard from "../components/categoryCard";

const Restaurants = () => {
  return (
    <ScrollView>
      <View style={[styles.container]}>
        <NavBar />
        <View style={[styles.restaurants]}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  red: {
    backgroundColor: "#D43325",
  },
  yellow: {
    backgroundColor: "#D6C02C",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
});

export default Restaurants;
