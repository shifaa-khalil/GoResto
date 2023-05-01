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

  useEffect(() => {
    if (route.params?.cuisine) {
      axios
        .get(`${URL}/api/filterByCuisine/${route.params.cuisine}`)
        .then((response) => {
          setRestaurants(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/api/getRestaurants`)
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);

    if (selectedCategory == "all") {
      axios
        .get(`${URL}/api/getRestaurants`)
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${URL}/api/filterByCuisine/${selectedCategory}`)
        .then((response) => {
          setRestaurants(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  const handleSubmit = () => {
    if (selectedFilter == "price") {
      axios
        .get(`${URL}/api/filterByPrice/${minPriceSelected}/${maxPriceSelected}`)
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (selectedFilter == "rating") {
      axios
        .get(
          `${URL}/api/filterByRating/${minRatingSelected}/${maxRatingSelected}`
        )
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (selectedFilter == "location") {
      axios
        .get(`${URL}/api/filterByLocation/${locationSelected}`)
        .then((response) => {
          console.log(response.data.restaurants);
          setRestaurants(response.data.restaurants);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container]}>
        <NavBar2 />
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
