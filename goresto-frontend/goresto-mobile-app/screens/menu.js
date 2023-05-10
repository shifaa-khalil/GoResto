import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
} from "react-native";
import SearchBar from "../components/searchBar";
import MenuItem from "../components/menuItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configs/URL";

const Menu = ({ route }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
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
          setIsLoading(false);
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, searchInput]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}
    >
      <View style={[styles.container]}>
        <View style={styles.heading}>
          <Text style={styles.restaurantName}>{route.params.name}</Text>
          <SearchBar
            onChangeText={(text) => {
              setSearchInput(text);
            }}
          />
        </View>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
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
  spinner: {
    marginTop: 150,
  },
});

export default Menu;
