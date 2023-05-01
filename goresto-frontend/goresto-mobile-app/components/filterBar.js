import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";

const FilterBar = ({
  onFilterSelected,
  onMinPriceChange,
  onMaxPriceChange,
  onMinRatingChange,
  onMaxRatingChange,
  onLocationChange,
  onSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [location, setLocation] = useState("");

  const handleFilterSelection = (filter) => {
    onFilterSelected(filter);
  };

  const handleMinPriceChange = (minPrice) => {
    onMinPriceChange(minPrice);
    setMinRating("");
    setMaxRating("");
    setLocation("");
  };

  const handleMaxPriceChange = (minPrice) => {
    onMaxPriceChange(minPrice);
    setMinRating("");
    setMaxRating("");
    setLocation("");
  };

  const handleMinRatingChange = (minRating) => {
    onMinRatingChange(minRating);
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
  };
  const handleMaxRatingChange = (minRating) => {
    onMaxRatingChange(minRating);
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
  };
  const handleLocationChange = (location) => {
    onLocationChange(location);
    setMinRating("");
    setMaxRating("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <View>
      <View style={[styles.bar]}>
        <Text style={[styles.sortBy]}>SortBy</Text>
        <Text style={[styles.text]}>price</Text>
        <Text style={[styles.text]}>rating</Text>
        <Text style={[styles.text]}>location</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            visible ? setVisible(false) : setVisible(true);
          }}
        >
          <Text style={[styles.filter]}>Filter</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.filters, { display: visible ? "flex" : "none" }]}>
        <TouchableWithoutFeedback
          onPress={() => handleFilterSelection("price")}
        >
          <Text style={[styles.filterText]}>price</Text>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.filterInput}
          value={minPrice}
          onChangeText={(text) => {
            setMinPrice(text);
            handleMinPriceChange(text);
          }}
        />
        <TextInput
          style={styles.filterInput}
          value={maxPrice}
          onChangeText={(text) => {
            setMaxPrice(text);
            handleMaxPriceChange(text);
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => handleFilterSelection("rating")}
        >
          <Text style={[styles.filterText]}>rating</Text>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.filterInput}
          value={minRating}
          onChangeText={(text) => {
            setMinRating(text);
            handleMinRatingChange(text);
          }}
        />
        <TextInput
          style={styles.filterInput}
          value={maxRating}
          onChangeText={(text) => {
            setMaxRating(text);
            handleMaxRatingChange(text);
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => handleFilterSelection("location")}
        >
          <Text style={[styles.filterText]}>location</Text>
        </TouchableWithoutFeedback>
        <TextInput
          style={styles.filterInput}
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            handleLocationChange(text);
          }}
        />
        <TouchableOpacity onPress={onSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "rgba(0,0,0,0.2)",
  },
  filterText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  sortBy: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
  filter: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  filters: {
    flexDirection: "row",
    width: 310,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  filterInput: {
    width: 30,
    height: 15,
    borderWidth: 1,
  },
});

export default FilterBar;
