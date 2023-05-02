import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import NavBar2 from "../components/navBar2";
import RestaurantCard from "../components/restaurantCard";
import CategoryBar from "../components/categoriesBar";
import FilterBar from "../components/filterBar";
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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
  };

  const handleMinPriceChange = (minPrice) => {
    setMinPriceSelected(minPrice);
  };

  const handleMaxPriceChange = (maxPrice) => {
    setMaxPriceSelected(maxPrice);
  };

  const handleMinRatingChange = (minRating) => {
    setMinRatingSelected(minRating);
  };

  const handleMaxRatingChange = (maxRating) => {
    setMaxRatingSelected(maxRating);
  };

  const handleLocationChange = (location) => {
    setLocationSelected(location);
  };

  const callAxios = (url) => {
    axios
      .get(url)
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
  }, []);

  useEffect(() => {
    if (selectedCategory == "all") {
      callAxios(`${URL}/api/getRestaurants`);
    } else {
      callAxios(`${URL}/api/filterByCuisine/${selectedCategory}`);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchInput.length > 0) {
      callAxios(`${URL}/api/searchRestaurant/${searchInput}`);
    } else {
      callAxios(`${URL}/api/getRestaurants`);
    }
  }, [searchInput]);

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
        <NavBar2
          onChangeText={(text) => {
            setSearchInput(text);
            console.log(text);
            console.log(searchInput);
          }}
        />
        <CategoryBar onCategorySelected={handleCategorySelection} />
        <FilterBar
          onFilterSelected={handleFilterSelection}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onMinRatingChange={handleMinRatingChange}
          onMaxRatingChange={handleMaxRatingChange}
          onLocationChange={handleLocationChange}
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
