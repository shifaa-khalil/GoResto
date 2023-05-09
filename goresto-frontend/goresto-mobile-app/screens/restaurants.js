import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import RestaurantCard from "../components/restaurantCard";
import CategoryBar from "../components/categoriesBar";
import { URL } from "../configs/URL";

const Restaurants = ({ route }) => {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [minPriceSelected, setMinPriceSelected] = useState("");
  const [maxPriceSelected, setMaxPriceSelected] = useState("");
  const [minRatingSelected, setMinRatingSelected] = useState("");
  const [maxRatingSelected, setMaxRatingSelected] = useState("");
  const [locationSelected, setLocationSelected] = useState("");
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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const callAxios = (url) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.restaurants);
        setRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (route.params?.cuisine) {
      callAxios(`${URL}/api/filterByCuisine/${route.params.cuisine}`);
    } else {
      callAxios(`${URL}/api/getRestaurants`);
    }
  }, [token]);

  useEffect(() => {
    if (selectedCategory == "all") {
      callAxios(`${URL}/api/getRestaurants`);
    } else {
      callAxios(`${URL}/api/filterByCuisine/${selectedCategory}`);
    }
  }, [token, selectedCategory]);

  useEffect(() => {
    if (searchInput.length > 0) {
      callAxios(`${URL}/api/searchRestaurant/${searchInput}`);
    } else {
      callAxios(`${URL}/api/getRestaurants`);
    }
  }, [token, searchInput]);

  const handleSubmit = () => {
    if (selectedFilter == "price") {
      callAxios(
        `${URL}/api/filterByPrice/${minPriceSelected}/${maxPriceSelected}`
      );
    } else if (selectedFilter == "rating") {
      callAxios(
        `${URL}/api/filterByRating/${minRatingSelected}/${maxRatingSelected}`
      );
    } else if (selectedFilter == "location") {
      callAxios(`${URL}/api/filterByLocation/${locationSelected}`);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <CategoryBar onCategorySelected={handleCategorySelection} />
        <NavBar2
          onChangeText={(text) => {
            setSearchInput(text);
          }}
          onFilterSelected={(filter) => setSelectedFilter(filter)}
          onMinPriceChange={(minPrice) => setMinPriceSelected(minPrice)}
          onMaxPriceChange={(maxPrice) => setMaxPriceSelected(maxPrice)}
          onMinRatingChange={(minRating) => setMinRatingSelected(minRating)}
          onMaxRatingChange={(maxRating) => setMaxRatingSelected(maxRating)}
          onLocationChange={(location) => setLocationSelected(location)}
          onSubmit={handleSubmit}
        />
        <View style={[styles.restaurants]}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              image={restaurant.logo}
              name={restaurant.name}
              rating={restaurant.rating}
              // deposit={restaurant.deposit}
              location={restaurant.location}
              onPress={() =>
                navigation.navigate("Restaurant", {
                  restaurant_id: restaurant.id,
                  name: restaurant.name,
                  rating: restaurant.rating,
                  location: restaurant.location,
                  deposit: restaurant.deposit,
                  image: restaurant.logo,
                })
              }
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
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
});

export default Restaurants;
