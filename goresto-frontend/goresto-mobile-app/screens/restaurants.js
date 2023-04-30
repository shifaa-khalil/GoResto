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
import RestaurantCard from "../components/restaurantCard";
import CategoryBar from "../components/categoriesBar";
import FilterBar from "../components/filterBar";

const Restaurants = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <CategoryBar />
        <FilterBar />
        <View style={[styles.restaurants]}>
          <RestaurantCard
            image={French}
            name="Doudou"
            rating="4.2"
            cuisine="French"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
          <RestaurantCard
            image={Chinese}
            name="Doudou"
            rating="4.2"
            cuisine="Chinese"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
          <RestaurantCard
            image={Japanese}
            name="Doudou"
            rating="4.2"
            cuisine="Japanese"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
          <RestaurantCard
            image={Italian}
            name="Doudou"
            rating="4.2"
            cuisine="Italian"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
          <RestaurantCard
            image={Lebanese}
            name="Doudou"
            rating="4.2"
            cuisine="Lebanese"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
          <RestaurantCard
            image={Indian}
            name="Doudou"
            rating="4.2"
            cuisine="Indian"
            location="Beirut-Sioufi"
            onPress={() => console.log("pressed")}
          />
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
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
});

export default Restaurants;
