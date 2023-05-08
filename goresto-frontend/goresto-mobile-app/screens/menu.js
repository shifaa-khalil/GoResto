import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import SearchBar from "../components/searchBar";
import MenuItem from "../components/menuItem";
import Reserved from "../assets/reserved.png";
import { URL } from "../configs/URL";

const Menu = ({ route }) => {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.length > 0) {
      axios
        .get(
          `${URL}/api/searchMenuItem/${searchInput}/${route.params.restaurant_id}`
        )
        .then((response) => {
          setMenuItems(response.data.menuItems);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/api/getMenu/17`)
        .then((response) => {
          setMenuItems(response.data.menu);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchInput]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        {/* <NavBar2 /> */}
        <View style={styles.heading}>
          <Text style={styles.restaurantName}>KFC</Text>
          <SearchBar
            onChangeText={(text) => {
              setSearchInput(text);
            }}
          />
        </View>
        <View style={styles.menu}>
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.id}
              itemName={menuItem.name}
              price={`$${menuItem.price}`}
              image={menuItem.image}
              onPress={() => console.log("menuItem")}
            />
          ))}
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
  heading: {
    backgroundColor: "#D43325",
    height: 150,
    width: "100%",
    padding: 25,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
    // textAlign: "center",
  },
  menu: {
    width: 310,
    flexDirection: "row",
    justifyContent: "space-between",
    // columnGap: 60,
    flexWrap: "wrap",
    marginTop: 50,
  },
});

export default Menu;
