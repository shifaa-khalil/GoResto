import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
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
  const [params, setParams] = useState("");
  const [justEntered, setJustEntered] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      setToken(JSON.parse(value));
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

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
        setRestaurants(response.data.restaurants);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData("token");
    if (route.params?.cuisine && justEntered) {
      setParams(route.params.cuisine);
    }
    if ((params && justEntered) || !route.params) {
      setJustEntered(false);
    }
  }, [params]);

  useEffect(() => {
    if (!justEntered) {
      if (searchInput.length > 0) {
        callAxios(`${URL}/api/searchRestaurant/${searchInput}/${params}`);
      } else if (searchInput.length == 0) {
        if (params) {
          callAxios(`${URL}/api/filterByCuisine/${params}`);
        } else {
          callAxios(`${URL}/api/getRestaurants`);
        }
      }
    }
  }, [token, searchInput, params, justEntered]);

  useEffect(() => {
    if (selectedCategory == "all") {
      setParams("");
    } else if (selectedCategory) {
      setParams(selectedCategory);
    }
  }, [selectedCategory]);

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.screenContainer]}
    >
      <View style={[styles.container]}>
        {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#d43325" />
          </View>
        ) : (
          <>
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
              {restaurants ? (
                restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    image={restaurant.logo}
                    name={restaurant.name}
                    rating={restaurant.rating}
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
                ))
              ) : (
                <View>
                  <Text>No data</Text>
                </View>
              )}
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
  restaurants: {
    width: 310,
    marginVertical: 40,
  },
  spinner: {
    marginTop: 150,
  },
});

export default Restaurants;
