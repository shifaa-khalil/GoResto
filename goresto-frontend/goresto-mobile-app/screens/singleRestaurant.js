import * as React from "react";
import { ScrollView, Image, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import MyButton from "../components/button";
import MyLink from "../components/link";
import GoPro from "../assets/GoPro.png";
import NavBar2 from "../components/navBar2";
import Signin from "./signin";
import NavCard from "../components/navigationalCard";
import Reservations from "../assets/reservationsWhite.png";
import Chats from "../assets/chatsWhite.png";
import DownArrow from "../assets/downArrow.png";
import Chinese from "../assets/chinese.png";
import Heart from "../assets/heart.png";
import Star from "../assets/Star.png";
import Lebanese from "../assets/lebanese.png";
import French from "../assets/french.png";
import Indian from "../assets/indian.png";
import RestaurantCard from "../components/restaurantCard";
import CategoryBar from "../components/categoriesBar";
import FilterBar from "../components/filterBar";

const Restaurant = ({ image, name, rating, cuisine, location }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <View style={[styles.restaurant]}>
          <Image source={Chinese} style={[styles.image]} />
          <View style={[styles.details]}>
            <View style={[styles.text]}>
              <Text style={[styles.name]}>Doudou</Text>
              <View style={[styles.row]}>
                <Text style={[styles.rating]}>4.2</Text>
                <Image source={Star} style={styles.star} />
                <Text style={[styles.cuisine]}>Chinese</Text>
              </View>
              <Text style={[styles.location]} numberOfLines={1}>
                Beirut-Sioufi
              </Text>
            </View>
            <View style={[styles.heart]}>
              <Image source={Heart} />
            </View>
            <Text style={[styles.link]}>Reserve</Text>
          </View>
          <Text style={[styles.cost]}>Average per person: $65</Text>
          <Text style={[styles.link]}>View on map</Text>
          <Text style={[styles.link]}>View menu</Text>
          <Text style={[styles.link]}>Contact</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  restaurant: {
    width: 310,
    marginVertical: 40,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 230,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  text: {
    // height: "100%",
    justifyContent: "center",
    flexBasis: "40%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  location: {
    fontSize: 20,
    overflow: "hidden",
    textOverflow: "ellipsis",
    // fontWeight: "bold",
  },
  star: {
    height: 20,
    width: 20,
  },
  heart: {
    borderLeftWidth: 1,
    paddingLeft: 25,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 20,
  },
  cost: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});

export default Restaurant;
