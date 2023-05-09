import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import SearchBar from "../components/searchBar";
import MenuItem from "../components/menuItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configs/URL";

const Menu = ({ route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [token, setToken] = useState("");

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return value !== null ? JSON.parse(value) : null;
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    getData("token");
  }, []);

  useEffect(() => {
    if (searchInput.length > 0) {
      axios
        .get(
          `${URL}/api/searchMenuItem/${searchInput}/${route.params.restaurant_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setMenuItems(response.data.menuItems);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/api/getMenu/${route.params.restaurant_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMenuItems(response.data.menu);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, searchInput]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <View style={styles.heading}>
          <Text style={styles.restaurantName}>{route.params.name}</Text>
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
  },
  menu: {
    width: 310,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 50,
  },
});

export default Menu;
