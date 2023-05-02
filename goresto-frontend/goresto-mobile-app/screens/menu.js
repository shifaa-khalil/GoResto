import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import MenuItem from "../components/menuItem";
import Reserved from "../assets/reserved.png";
import { URL } from "../configs/URL";

const Menu = () => {
  const navigation = useNavigation();

  //   useEffect(() => {
  //     axios
  //       .get(`${URL}/api/getReservations`)
  //       .then((response) => {
  //         console.log(response.data.reservations);
  //         setReservations(response.data.reservations);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
        <View style={styles.menu}>
          <MenuItem
            itemName="Beef burger"
            price="$17"
            image={Reserved}
            onPress={() => console.log("menuItem")}
          />
          <MenuItem
            itemName="Beef burger"
            price="$17"
            image={Reserved}
            onPress={() => console.log("menuItem")}
          />
          <MenuItem
            itemName="Beef burger"
            price="$17"
            image={Reserved}
            onPress={() => console.log("menuItem")}
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
  backgroundImage: {
    height: 250,
    resizeMode: "contain",
  },
  menu: {
    width: 310,
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 60,
    flexWrap: "wrap",
    marginTop: 50,
  },
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default Menu;
